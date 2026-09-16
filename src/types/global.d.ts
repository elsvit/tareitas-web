type Maybe<T> = T | null | undefined;

type RecordType<T> = Record<string, Maybe<T>>;
