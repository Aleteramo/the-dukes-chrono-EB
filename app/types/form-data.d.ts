interface FormData {
    entries(): IterableIterator<[string, FormDataEntryValue]>;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
  }