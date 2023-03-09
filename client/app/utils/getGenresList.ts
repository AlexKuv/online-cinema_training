export const getGenresListEach = (
  index: number,
  lenght: number,
  name: string
) => {
  return index + 1 === lenght ? name : name + ', '
}
