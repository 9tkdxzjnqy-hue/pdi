export const inducteesQuery = `*[_type == "inductee"] | order(year desc, nickname asc) {
  nickname,
  contribution,
  year
}`;
