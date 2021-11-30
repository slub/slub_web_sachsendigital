type MetadataArray = {
  metadata: Record<string, string | string[]>;
  screenshotFields: string[];
};

interface Network<T> {
  get(url: string): Promise<T>;
  abortPending(): void;
}
