describe("user api", function(){
  it("should set baseUrl by default", function(){
    var userApi = new UserApi();
    expect(userApi.baseUrl).toEqual('http://localhost:3000');
  });
})

