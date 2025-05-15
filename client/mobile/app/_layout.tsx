import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CarePlanProvider } from '../context/CarePlanContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// This component manages route protection based on authentication state
function RedirectGuard() {
  const { user } = useAuth();                // Access the current user from context
  const segments = useSegments();            // Get the current navigation segments
  const router = useRouter();                // Router instance to control navigation
  const [isReady, setIsReady] = useState(false); // Prevents redirect logic from firing before mount

  // Once the component mounts, mark it as ready
  useEffect(() => {
    setIsReady(true); 
  }, []);

  // Redirect logic that runs when user or route segments change
  useEffect(() => {
    if (!isReady) return; // Don't redirect until initial mount is complete

    const inAuthGroup = segments[0] === '(auth)'; // Check if current route is in the "(auth)" group

    // If not logged in and not on an auth route, redirect to login
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
    // If logged in and on an auth route (e.g., login), redirect to the main app
    else if (user && inAuthGroup) {
      router.replace('/home');
    }
  }, [user, segments, isReady]);

  // Render the route outlet
  return <Slot />;
}

// Root layout wraps the app in the AuthProvider and protects navigation
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CarePlanProvider> {/* Wraps all authenticated routes with access to care plan data */}
          <RedirectGuard />
        </CarePlanProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}