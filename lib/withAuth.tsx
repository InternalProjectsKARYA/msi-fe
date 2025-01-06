// "use client"
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { useAuthContext } from '@/lib/AuthProvider';



// const withAuth = (WrappedComponent: React.ComponentType<any>) => {
//     console.log('withAuth function called');
//   const AuthComponent = (props: any) => {
//     const { userId } = useAuthContext();
//     const router = useRouter();

//     useEffect(() => {
//       // Redirect to sign-in page if userId is not available
//       if (!userId) {
//         router.push('/auth');
//       }
//     }, [userId, router]);

//     // Render nothing or a loader while redirecting
//     if (!userId) {
//       return null; // You could return a loading spinner or message here
//     }

//     // Render the wrapped component if authenticated
//     return <WrappedComponent {...props} />;
//   };

//   return AuthComponent;
// };

// export default withAuth;



"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthProvider';

 

const withAuth = (WrappedComponent: React.ComponentType<any>, requiredRole?: string) => {
    console.log('withAuth function called');
  const AuthComponent = (props: any) => {
    const { userId, role  } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      // Redirect to sign-in page if userId is not available
      if (!userId) {
        router.push('/Auth/login');
      } 
      // Redirect if the user role is not authorized for the page
      else if (requiredRole && role !== requiredRole) {
        router.push('/unauthorized'); // Redirect to an unauthorized page or error page
      }
    }, [userId, role, router, requiredRole]);

    // Render nothing or a loader while redirecting
    if (!userId || (requiredRole && role !== requiredRole)) {
      return null; // You could return a loading spinner or message here
    }

    // Render the wrapped component if authenticated and authorized
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
