


// // import { GoogleLogin } from "@react-oauth/google";

// // export default function GoogleButton() {
// //   return (
// //     <GoogleLogin
// //       onSuccess={(credentialResponse) => {
// //         console.log("SUCCESS", credentialResponse);
// //       }}
// //       onError={() => {
// //         console.log("LOGIN FAILED");
// //       }}
// //     />
// //   );
// // }


import { useGoogleLogin } from "@react-oauth/google";
 import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
 

  const loginWithGoogle = useGoogleLogin({
    
    onSuccess: async(response) => {
      const userInfo=await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers:{
          Authorization:`Bearer ${response.access_token}`
        }
      });
      const userInfoJson=await userInfo.json();

      console.log("SUCCESS", userInfoJson);
      localStorage.setItem('user',JSON.stringify(userInfoJson));
    },
  
    onError: (error) => {
      console.log("ERROR", error);
    },
  });

  return (
    <button
    type="button"
      onClick={() => {
        console.error("Button is clicked");
        loginWithGoogle();
      }}
      className=" d-flex justify-content-center align-items-center btn btn-outline-secondary gap-2 button-google">
         <FcGoogle size={20}/> Continue with Google
    </button>
  );
}