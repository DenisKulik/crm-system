import localizeFilter from '../localize.filter';

describe('localizeFilter', () => {
  it('should be a name', () => {
    expect(localizeFilter('Name')).toEqual('Имя');
  });

  it('should be a title', () => {
    expect(localizeFilter('Title')).toEqual('Название');
  });

  it('should be a log in', () => {
    expect(localizeFilter('LogIn')).toEqual('Войдите в систему');
  });
});
