/**
 * PawnBet — PDI Ante-Post Liability Tracker
 *
 * A Google Sheets tool for managing bets and tracking liabilities on the night.
 * Works from your phone — no laptop needed.
 *
 * SETUP (one-time):
 *   1. Create a new Google Sheet
 *   2. Extensions > Apps Script
 *   3. Paste this entire file, replacing any default code
 *   4. Click Run > setup (or select "setup" from the dropdown and click the play button)
 *   5. Authorize when prompted
 *   6. Return to the sheet — 4 tabs are ready
 *
 * ON THE NIGHT:
 *   - Players tab: type Y next to eliminated players
 *   - Bets tab: add new bets (punter, player, stake, decimal odds, E/W)
 *   - Odds tab: live implied probabilities and overround (auto-updates on eliminations)
 *   - Dashboard tab: auto-updates on every edit
 *   - PawnBet menu: manual Recalculate or Reset Eliminations
 *
 * ODDS FORMAT — decimal (total return including stake):
 *   3/1  = 4.0    7/2  = 4.5    10/1 = 11.0
 *   9/1  = 10.0   14/1 = 15.0   25/1 = 26.0
 *
 * EACH-WAY RULES:
 *   - Each-way = 2 units of stake (win bet + place bet)
 *   - Win leg: pays full odds if player wins PDI
 *   - Place leg: pays 1/2 odds if player finishes 1st/2nd in PDI or wins Shield
 *   - If player wins PDI: both legs pay
 *   - If player places only (2nd or Shield): only place leg pays
 *   - If eliminated: both legs lose, you keep the stakes
 */

// --- PDI 2026 Field ---

var PLAYERS = [
  "The Boy",
  "The Express",
  "Gat",
  "A Lister",
  "Physio",
  "Rebel",
  "Gun",
  "Byrner",
  "The Cat",
  "Bob",
  "C.O'R",
  "Sexy Boy",
  "Bad Medicine",
  "Vinny",
  "Monster",
  "The Kitten",
  "The Pawn",
  "Simmo",
  "Lac",
  "Should Wear A Helmet",
  "Mitch",
  "Nugent",
  "Leo",
  "J.B",
  "E.B",
  "O.D"
];

// Fractional odds and decimal equivalents for each player (same order as PLAYERS)
var PLAYER_ODDS = [
  { fractional: "2/1",   decimal: 3.0  },
  { fractional: "7/2",   decimal: 4.5  },
  { fractional: "6/1",   decimal: 7.0  },
  { fractional: "10/1",  decimal: 11.0 },
  { fractional: "9/1",   decimal: 10.0 },
  { fractional: "10/1",  decimal: 11.0 },
  { fractional: "10/1",  decimal: 11.0 },
  { fractional: "12/1",  decimal: 13.0 },
  { fractional: "8/1",   decimal: 9.0  },
  { fractional: "12/1",  decimal: 13.0 },
  { fractional: "14/1",  decimal: 15.0 },
  { fractional: "16/1",  decimal: 17.0 },
  { fractional: "10/1",  decimal: 11.0 },
  { fractional: "14/1",  decimal: 15.0 },
  { fractional: "14/1",  decimal: 15.0 },
  { fractional: "14/1",  decimal: 15.0 },
  { fractional: "18/1",  decimal: 19.0 },
  { fractional: "18/1",  decimal: 19.0 },
  { fractional: "20/1",  decimal: 21.0 },
  { fractional: "20/1",  decimal: 21.0 },
  { fractional: "20/1",  decimal: 21.0 },
  { fractional: "22/1",  decimal: 23.0 },
  { fractional: "20/1",  decimal: 21.0 },
  { fractional: "25/1",  decimal: 26.0 },
  { fractional: "25/1",  decimal: 26.0 },
  { fractional: "25/1",  decimal: 26.0 }
];

// ============================================================
// SETUP
// ============================================================

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var playersSheet = getOrCreateSheet(ss, "Players");
  var betsSheet    = getOrCreateSheet(ss, "Bets");
  var oddsSheet    = getOrCreateSheet(ss, "Odds");
  var dashSheet    = getOrCreateSheet(ss, "Dashboard");

  // Remove default Sheet1 if it exists
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  setupPlayersSheet(playersSheet);
  setupBetsSheet(betsSheet, ss);
  setupOddsSheet(oddsSheet);
  setupDashboardSheet(dashSheet);

  // Tab colours
  playersSheet.setTabColor("#00FF92");
  betsSheet.setTabColor("#7F3DFF");
  oddsSheet.setTabColor("#FFAA00");
  dashSheet.setTabColor("#00E6B8");

  // Run initial calculation
  recalculate();

  ss.setActiveSheet(dashSheet);
  SpreadsheetApp.getUi().alert(
    "PawnBet setup complete!\n\n" +
    "Sheets created:\n" +
    "  Players   — mark eliminations with Y\n" +
    "  Bets      — add bets\n" +
    "  Odds      — live implied probabilities\n" +
    "  Dashboard — auto-calculated\n\n" +
    "Use the PawnBet menu for manual recalculate or reset."
  );
}

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function setupPlayersSheet(sheet) {
  sheet.clear();
  sheet.clearFormats();

  sheet.getRange("A1").setValue("Player");
  sheet.getRange("B1").setValue("Eliminated");
  var header = sheet.getRange("A1:B1");
  header.setFontWeight("bold");
  header.setBackground("#1a1a2e");
  header.setFontColor("#00FF92");

  for (var i = 0; i < PLAYERS.length; i++) {
    sheet.getRange(i + 2, 1).setValue(PLAYERS[i]);
  }

  var elimRange = sheet.getRange(2, 2, PLAYERS.length, 1);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Y", ""], true)
    .setAllowInvalid(false)
    .build();
  elimRange.setDataValidation(rule);

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 100);
  sheet.setFrozenRows(1);
}

function setupBetsSheet(sheet, ss) {
  sheet.clear();
  sheet.clearFormats();

  var headers = ["Punter", "Player", "Stake", "Odds", "E/W"];
  for (var i = 0; i < headers.length; i++) {
    sheet.getRange(1, i + 1).setValue(headers[i]);
  }
  var header = sheet.getRange("A1:E1");
  header.setFontWeight("bold");
  header.setBackground("#1a1a2e");
  header.setFontColor("#00FF92");

  var playersSheet = ss.getSheetByName("Players");
  var playerRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(playersSheet.getRange("A2:A100"), true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 2, 200, 1).setDataValidation(playerRule);

  var ewRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Y", "N"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 5, 200, 1).setDataValidation(ewRule);

  sheet.getRange(2, 3, 200, 1).setNumberFormat("#,##0.00");
  sheet.getRange(2, 4, 200, 1).setNumberFormat("0.0");

  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 80);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 60);
  sheet.setFrozenRows(1);
}

function setupOddsSheet(sheet) {
  sheet.clear();
  sheet.clearFormats();
  // Headers will be written by recalculate(), just initialise title
  sheet.getRange("A1").setValue("PawnBet Odds")
    .setFontSize(16).setFontWeight("bold").setFontColor("#FFAA00");
  sheet.getRange("A2").setValue("Run setup() to initialise")
    .setFontColor("#9CA3AF").setFontSize(9);
}

function setupDashboardSheet(sheet) {
  sheet.clear();
  sheet.clearFormats();
  sheet.getRange("A1").setValue("PawnBet Dashboard")
    .setFontSize(16).setFontWeight("bold").setFontColor("#00FF92");
  sheet.getRange("A2").setValue("Run setup() to initialise")
    .setFontColor("#9CA3AF").setFontSize(9);
}

// ============================================================
// TRIGGERS & MENU
// ============================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("PawnBet")
    .addItem("Recalculate", "recalculate")
    .addSeparator()
    .addItem("Reset Eliminations", "resetEliminations")
    .addToUi();
}

function onEdit(e) {
  if (!e) return;
  var sheetName = e.source.getActiveSheet().getName();
  if (sheetName === "Players" || sheetName === "Bets") {
    recalculate();
  }
}

function resetEliminations() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Players");
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.getRange(2, 2, lastRow - 1, 1).clearContent();
  }
  recalculate();
  SpreadsheetApp.getUi().alert("All eliminations cleared.");
}

// ============================================================
// CORE ENGINE
// ============================================================

function recalculate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var playersSheet = ss.getSheetByName("Players");
  var betsSheet    = ss.getSheetByName("Bets");
  var dashSheet    = ss.getSheetByName("Dashboard");
  var oddsSheet    = ss.getSheetByName("Odds");
  if (!playersSheet || !betsSheet || !dashSheet || !oddsSheet) return;

  // --- Read players ---
  var playersData = playersSheet.getDataRange().getValues();
  var players = {};
  var playerOrder = [];
  for (var i = 1; i < playersData.length; i++) {
    var name = String(playersData[i][0]).trim();
    if (!name) continue;
    players[name] = {
      eliminated: String(playersData[i][1]).toUpperCase().trim() === "Y"
    };
    playerOrder.push(name);
  }

  // --- Read bets ---
  var betsData = betsSheet.getDataRange().getValues();
  var bets = [];
  for (var i = 1; i < betsData.length; i++) {
    var punter = String(betsData[i][0]).trim();
    var player = String(betsData[i][1]).trim();
    var stake  = parseFloat(betsData[i][2]) || 0;
    var odds   = parseFloat(betsData[i][3]) || 0;
    var ew     = String(betsData[i][4]).toUpperCase().trim() === "Y";
    if (player && stake > 0 && odds > 1) {
      bets.push({ punter: punter, player: player, stake: stake, odds: odds, ew: ew });
    }
  }

  // --- Calculate per-player liabilities ---
  var liabilities = {};
  for (var i = 0; i < playerOrder.length; i++) {
    liabilities[playerOrder[i]] = { bets: 0, stakesIn: 0, ifWins: 0, ifPlaces: 0 };
  }

  var totalStakes = 0;
  var totalBets   = bets.length;

  for (var i = 0; i < bets.length; i++) {
    var b = bets[i];
    if (!liabilities[b.player]) {
      liabilities[b.player] = { bets: 0, stakesIn: 0, ifWins: 0, ifPlaces: 0 };
    }
    var lib = liabilities[b.player];
    lib.bets++;
    var stakesIn   = b.ew ? b.stake * 2 : b.stake;
    lib.stakesIn  += stakesIn;
    totalStakes   += stakesIn;
    var winPayout  = b.stake * b.odds;
    var placePayout = b.ew ? b.stake * (b.odds + 1) / 2 : 0;
    lib.ifWins    += winPayout + placePayout;
    lib.ifPlaces  += placePayout;
  }

  // --- Categorise players ---
  var activePlayerCount  = 0;
  var elimCount          = 0;
  var activeBetPlayers   = [];
  var activeNoBetPlayers = [];
  var elimPlayers        = [];

  for (var i = 0; i < playerOrder.length; i++) {
    var name = playerOrder[i];
    if (players[name].eliminated) {
      elimCount++;
      elimPlayers.push(name);
    } else {
      activePlayerCount++;
      if (liabilities[name].bets > 0) {
        activeBetPlayers.push(name);
      } else {
        activeNoBetPlayers.push(name);
      }
    }
  }

  activeBetPlayers.sort(function(a, b) {
    return liabilities[b].ifWins - liabilities[a].ifWins;
  });

  // --- P&L scenarios ---
  var scenarios = [];
  for (var i = 0; i < activeBetPlayers.length; i++) {
    var name        = activeBetPlayers[i];
    var winnerPayout = liabilities[name].ifWins;
    var placeLiabilities = [];
    for (var j = 0; j < activeBetPlayers.length; j++) {
      if (activeBetPlayers[j] !== name) {
        placeLiabilities.push(liabilities[activeBetPlayers[j]].ifPlaces);
      }
    }
    placeLiabilities.sort(function(a, b) { return b - a; });
    var worstPayout = winnerPayout +
      (placeLiabilities.length > 0 ? placeLiabilities[0] : 0) +
      (placeLiabilities.length > 1 ? placeLiabilities[1] : 0);
    scenarios.push({
      name: name,
      winnerPayout: winnerPayout,
      worstPayout: worstPayout,
      netPL: totalStakes - worstPayout
    });
  }
  scenarios.sort(function(a, b) { return a.netPL - b.netPL; });

  var bestCasePL = totalStakes;
  if (activeNoBetPlayers.length === 0 && scenarios.length > 0) {
    bestCasePL = totalStakes - scenarios[scenarios.length - 1].winnerPayout;
  }
  var worstCasePL = scenarios.length > 0 ? scenarios[0].netPL : totalStakes;

  // ============================================================
  // WRITE ODDS SHEET
  // ============================================================

  oddsSheet.clear();
  oddsSheet.clearFormats();

  var oRow = 1;

  oddsSheet.getRange(oRow, 1).setValue("PawnBet Odds — PDI 2026")
    .setFontSize(14).setFontWeight("bold").setFontColor("#FFAA00");
  oRow++;
  oddsSheet.getRange(oRow, 1)
    .setValue("Updated: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:mm dd/MM"))
    .setFontColor("#9CA3AF").setFontSize(9);
  oRow += 2;

  // Headers
  var oddsHeaders = ["Player", "Fractional", "Decimal", "Implied %", "Status"];
  for (var h = 0; h < oddsHeaders.length; h++) {
    oddsSheet.getRange(oRow, h + 1).setValue(oddsHeaders[h])
      .setFontWeight("bold").setBackground("#1a1a2e").setFontColor("#FFAA00");
  }
  oRow++;

  // Build a lookup: player name → odds entry
  var oddsLookup = {};
  for (var i = 0; i < PLAYERS.length; i++) {
    oddsLookup[PLAYERS[i]] = PLAYER_ODDS[i];
  }

  var totalImpliedActive   = 0;
  var totalImpliedAll      = 0;
  var activeOddsEntries    = []; // for overround calculation rows

  // Active players first
  for (var i = 0; i < playerOrder.length; i++) {
    var name    = playerOrder[i];
    var entry   = oddsLookup[name];
    if (!entry) continue;
    var implied = (1 / entry.decimal) * 100;
    totalImpliedAll += implied;
    if (!players[name].eliminated) totalImpliedActive += implied;
  }

  for (var i = 0; i < playerOrder.length; i++) {
    var name      = playerOrder[i];
    var entry     = oddsLookup[name];
    if (!entry) continue;
    var isElim    = players[name].eliminated;
    var implied   = (1 / entry.decimal) * 100;
    var colour    = isElim ? "#555555" : "#F5F0E6";
    var statusTxt = isElim ? "ELIMINATED" : "ACTIVE";
    var statusCol = isElim ? "#555555" : "#00FF92";

    oddsSheet.getRange(oRow, 1).setValue(name).setFontColor(colour);
    oddsSheet.getRange(oRow, 2).setValue(entry.fractional).setFontColor(colour);
    oddsSheet.getRange(oRow, 3).setValue(entry.decimal).setNumberFormat("0.00").setFontColor(colour);
    oddsSheet.getRange(oRow, 4).setValue(implied / 100).setNumberFormat("0.0%").setFontColor(colour);
    oddsSheet.getRange(oRow, 5).setValue(statusTxt).setFontColor(statusCol);

    if (isElim) {
      oddsSheet.getRange(oRow, 1, 1, 5).setFontLine("line-through");
    }

    oRow++;
  }

  oRow++;

  // Overround summary
  var overroundAll    = totalImpliedAll;
  var overroundActive = totalImpliedActive;
  var marginAll       = overroundAll - 100;
  var marginActive    = overroundActive - 100;

  oddsSheet.getRange(oRow, 1).setValue("OVERROUND").setFontWeight("bold").setFontColor("#FFAA00");
  oRow++;

  var orRows = [
    ["Full field (all 26)",       overroundAll    / 100, marginAll    / 100],
    ["Active runners only",       overroundActive / 100, marginActive / 100]
  ];

  var orHeaders2 = ["", "Total Implied", "Margin (book %)"];
  for (var h = 0; h < orHeaders2.length; h++) {
    if (orHeaders2[h]) {
      oddsSheet.getRange(oRow, h + 1).setValue(orHeaders2[h])
        .setFontWeight("bold").setFontColor("#9CA3AF").setFontSize(9);
    }
  }
  oRow++;

  for (var i = 0; i < orRows.length; i++) {
    var r = orRows[i];
    oddsSheet.getRange(oRow, 1).setValue(r[0]).setFontColor("#9CA3AF");
    oddsSheet.getRange(oRow, 2).setValue(r[1]).setNumberFormat("0.0%").setFontColor("#F5F0E6").setFontWeight("bold");
    oddsSheet.getRange(oRow, 3).setValue(r[2]).setNumberFormat("+0.0%;-0.0%").setFontColor("#FFAA00").setFontWeight("bold");
    oRow++;
  }

  for (var c = 1; c <= 5; c++) {
    oddsSheet.autoResizeColumn(c);
  }

  // ============================================================
  // WRITE DASHBOARD
  // ============================================================

  dashSheet.clear();
  dashSheet.clearFormats();
  var row = 1;
  var EUR = "\u20AC#,##0.00";

  dashSheet.getRange(row, 1).setValue("PawnBet Dashboard")
    .setFontSize(16).setFontWeight("bold").setFontColor("#00FF92");
  row++;
  dashSheet.getRange(row, 1)
    .setValue("Updated: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "HH:mm dd/MM"))
    .setFontColor("#9CA3AF").setFontSize(9);
  row += 2;

  // SUMMARY
  dashSheet.getRange(row, 1).setValue("SUMMARY")
    .setFontWeight("bold").setFontSize(12).setFontColor("#00FF92");
  row++;

  var summaryRows = [
    ["Total Bets",       totalBets,                                       null],
    ["Total Stakes",     totalStakes,                                     EUR],
    ["Active Players",   activePlayerCount + " / " + playerOrder.length, null],
    ["Eliminated",       elimCount,                                       null],
    ["Best-Case P&L",    bestCasePL,                                      EUR],
    ["Worst-Case P&L",   worstCasePL,                                     EUR]
  ];

  for (var i = 0; i < summaryRows.length; i++) {
    var s = summaryRows[i];
    dashSheet.getRange(row, 1).setValue(s[0]).setFontWeight("bold");
    var cell = dashSheet.getRange(row, 2);
    cell.setValue(s[1]);
    if (s[2]) cell.setNumberFormat(s[2]);
    if (i === 4 || i === 5) {
      cell.setFontColor(s[1] >= 0 ? "#00FF92" : "#FF4444");
      cell.setFontWeight("bold");
    }
    row++;
  }

  row += 2;

  // ACTIVE PLAYER LIABILITIES
  dashSheet.getRange(row, 1).setValue("ACTIVE PLAYER LIABILITIES")
    .setFontWeight("bold").setFontSize(12).setFontColor("#00FF92");
  row++;

  var liabHeaders = ["Player", "Bets", "Stakes In", "If Wins PDI", "If Places", "Status"];
  for (var h = 0; h < liabHeaders.length; h++) {
    dashSheet.getRange(row, h + 1).setValue(liabHeaders[h])
      .setFontWeight("bold").setBackground("#1a1a2e").setFontColor("#00FF92");
  }
  row++;

  for (var i = 0; i < activeBetPlayers.length; i++) {
    var name = activeBetPlayers[i];
    var lib  = liabilities[name];
    dashSheet.getRange(row, 1).setValue(name);
    dashSheet.getRange(row, 2).setValue(lib.bets);
    dashSheet.getRange(row, 3).setValue(lib.stakesIn).setNumberFormat(EUR);
    dashSheet.getRange(row, 4).setValue(lib.ifWins).setNumberFormat(EUR).setFontColor("#FF4444");
    dashSheet.getRange(row, 5).setValue(lib.ifPlaces).setNumberFormat(EUR).setFontColor("#FFAA00");
    dashSheet.getRange(row, 6).setValue("ACTIVE").setFontColor("#00FF92");
    row++;
  }

  for (var i = 0; i < activeNoBetPlayers.length; i++) {
    var name = activeNoBetPlayers[i];
    dashSheet.getRange(row, 1).setValue(name).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 2).setValue(0).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 3).setValue(0).setNumberFormat(EUR).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 4).setValue(0).setNumberFormat(EUR).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 5).setValue(0).setNumberFormat(EUR).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 6).setValue("NO BETS").setFontColor("#9CA3AF");
    row++;
  }

  row++;

  // ELIMINATED
  if (elimPlayers.length > 0) {
    dashSheet.getRange(row, 1).setValue("ELIMINATED")
      .setFontWeight("bold").setFontSize(12).setFontColor("#666666");
    row++;

    for (var i = 0; i < elimPlayers.length; i++) {
      var name = elimPlayers[i];
      var lib  = liabilities[name];
      var kept = lib.stakesIn;
      dashSheet.getRange(row, 1).setValue(name).setFontColor("#666666");
      dashSheet.getRange(row, 2).setValue(lib.bets).setFontColor("#666666");
      dashSheet.getRange(row, 3).setValue(lib.stakesIn).setNumberFormat(EUR).setFontColor("#666666");
      dashSheet.getRange(row, 4).setValue("\u2014").setFontColor("#666666");
      dashSheet.getRange(row, 5).setValue("\u2014").setFontColor("#666666");
      dashSheet.getRange(row, 6)
        .setValue(kept > 0 ? "LOST \u2014 \u20AC" + kept.toFixed(2) + " kept" : "ELIMINATED")
        .setFontColor("#666666");
      row++;
    }
  }

  row += 2;

  // P&L SCENARIOS
  dashSheet.getRange(row, 1).setValue("P&L SCENARIOS")
    .setFontWeight("bold").setFontSize(12).setFontColor("#00FF92");
  row++;
  dashSheet.getRange(row, 1)
    .setValue("Worst case: winner payout + top 2 place payouts from other players")
    .setFontColor("#9CA3AF").setFontSize(9);
  row++;

  var scenHeaders = ["If Winner Is...", "Winner Payouts", "Worst Total", "Net P&L"];
  for (var h = 0; h < scenHeaders.length; h++) {
    dashSheet.getRange(row, h + 1).setValue(scenHeaders[h])
      .setFontWeight("bold").setBackground("#1a1a2e").setFontColor("#00FF92");
  }
  row++;

  if (activeNoBetPlayers.length > 0) {
    dashSheet.getRange(row, 1).setValue("(any no-bet player)").setFontColor("#9CA3AF");
    dashSheet.getRange(row, 2).setValue(0).setNumberFormat(EUR).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 3).setValue(0).setNumberFormat(EUR).setFontColor("#9CA3AF");
    dashSheet.getRange(row, 4).setValue(totalStakes).setNumberFormat(EUR)
      .setFontColor("#00FF92").setFontWeight("bold");
    row++;
  }

  for (var i = 0; i < scenarios.length; i++) {
    var s = scenarios[i];
    dashSheet.getRange(row, 1).setValue(s.name);
    dashSheet.getRange(row, 2).setValue(s.winnerPayout).setNumberFormat(EUR);
    dashSheet.getRange(row, 3).setValue(s.worstPayout).setNumberFormat(EUR);
    dashSheet.getRange(row, 4).setValue(s.netPL).setNumberFormat(EUR)
      .setFontColor(s.netPL >= 0 ? "#00FF92" : "#FF4444")
      .setFontWeight("bold");
    row++;
  }

  if (scenarios.length === 0 && activeNoBetPlayers.length === 0) {
    dashSheet.getRange(row, 1).setValue("No active bets").setFontColor("#9CA3AF");
  }

  for (var c = 1; c <= 6; c++) {
    dashSheet.autoResizeColumn(c);
  }
}
