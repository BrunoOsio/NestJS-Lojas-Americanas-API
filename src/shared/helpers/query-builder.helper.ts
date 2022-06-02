export class QueryBuilder {

  private readonly starter = {where: {}}
  
  public start = (queryStarter) => {
    queryStarter = this.starter;
  }
}