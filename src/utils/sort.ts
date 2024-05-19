function sortComparator<T>(a: T, b: T, sortBy: keyof T) {
    if (a[sortBy] < b[sortBy]) {
        return -1;
    } else if (a[sortBy] > b[sortBy]) {
        return 1;
    }
    return 0;
}

export type SortOrder = 'asc' | 'desc';

export function getComparator<T>(
    order: SortOrder,
    orderBy: keyof T,
): (
    a: T,
    b: T,
) => number {
    return order === 'asc'
      ? (a, b) => sortComparator(a, b, orderBy)
      : (a, b) => -sortComparator(a, b, orderBy);
}

export function sortArray<T>(arr: T[], comparator: (a: T, b: T) => number) {
    const sortedArray = arr.slice();

    sortedArray.sort(comparator);

    return sortedArray;
}