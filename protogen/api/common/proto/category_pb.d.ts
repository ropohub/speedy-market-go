import * as jspb from 'google-protobuf'



export class Category extends jspb.Message {
  getCategoryId(): number;
  setCategoryId(value: number): Category;

  getName(): string;
  setName(value: string): Category;

  getImageUrl(): string;
  setImageUrl(value: string): Category;

  getSubcategoriesList(): Array<Category>;
  setSubcategoriesList(value: Array<Category>): Category;
  clearSubcategoriesList(): Category;
  addSubcategories(value?: Category, index?: number): Category;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Category.AsObject;
  static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
  static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Category;
  static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
}

export namespace Category {
  export type AsObject = {
    categoryId: number,
    name: string,
    imageUrl: string,
    subcategoriesList: Array<Category.AsObject>,
  }
}

export class CategorySet extends jspb.Message {
  getCategoriesList(): Array<Category>;
  setCategoriesList(value: Array<Category>): CategorySet;
  clearCategoriesList(): CategorySet;
  addCategories(value?: Category, index?: number): Category;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategorySet.AsObject;
  static toObject(includeInstance: boolean, msg: CategorySet): CategorySet.AsObject;
  static serializeBinaryToWriter(message: CategorySet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategorySet;
  static deserializeBinaryFromReader(message: CategorySet, reader: jspb.BinaryReader): CategorySet;
}

export namespace CategorySet {
  export type AsObject = {
    categoriesList: Array<Category.AsObject>,
  }
}

