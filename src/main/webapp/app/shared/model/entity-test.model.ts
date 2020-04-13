export interface IEntityTest {
  id?: number;
  test?: string;
}

export class EntityTest implements IEntityTest {
  constructor(public id?: number, public test?: string) {}
}
