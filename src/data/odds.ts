export interface OddsEntry {
  name: string;
  odds: string;
  previous?: string; // previous odds if changed
}

export const odds: OddsEntry[] = [
  { name: "The Boy", odds: "2/1", previous: "3/1" },
  { name: "The Express", odds: "7/2", previous: "9/2" },
  { name: "Gat", odds: "6/1", previous: "15/2" },
  { name: "A Lister", odds: "10/1", previous: "9/1" },
  { name: "Physio", odds: "9/1", previous: "8/1" },
  { name: "Rebel", odds: "10/1", previous: "9/1" },
  { name: "Gun", odds: "10/1", previous: "9/1" },
  { name: "Byrner", odds: "12/1", previous: "10/1" },
  { name: "The Cat", odds: "8/1", previous: "10/1" },
  { name: "Bob", odds: "12/1", previous: "10/1" },
  { name: "C.O'R", odds: "14/1", previous: "11/1" },
  { name: "Sexy Boy", odds: "16/1", previous: "12/1" },
  { name: "Bad Medicine", odds: "10/1", previous: "12/1" },
  { name: "Vinny", odds: "14/1", previous: "12/1" },
  { name: "Monster", odds: "14/1", previous: "12/1" },
  { name: "The Kitten", odds: "14/1", previous: "12/1" },
  { name: "The Pawn", odds: "18/1", previous: "16/1" },
  { name: "Simmo", odds: "18/1", previous: "16/1" },
  { name: "Lac", odds: "20/1", previous: "18/1" },
  { name: "Should Wear A Helmet", odds: "20/1" },
  { name: "Mitch", odds: "20/1" },
  { name: "Nugent", odds: "22/1", previous: "20/1" },
  { name: "Leo", odds: "20/1" },
  { name: "J.B", odds: "25/1" },
  { name: "E.B", odds: "25/1" },
  { name: "O.D", odds: "25/1" },
];

export const eachWayTerms = {
  places: "1st & 2nd",
  fraction: "1/2 the odds",
  bonus: "Win the Shield at 1/2 the odds",
};
