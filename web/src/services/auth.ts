interface Response{
    token: string;
    user: {
      name: string;
      email: string;
      password: string;
    };
  }
  
  export function signIn(): Promise<Response>{
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve({
          token: 'hsdkjashduklasduklhsdkashdlalshdiwyycbyiqbc',
          user: {
            name:'MapsAPAE',
            email:'apae@outlook.com',
            password: '123456'
          },
        });
      },2000);
    });
  }

  export default signIn;