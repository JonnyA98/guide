import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Routes that should only be accessible when NOT logged in
const publicOnlyRoutes = ['/', '/login', '/signup', '/auth'];

// Routes that should only be accessible when logged in
const privateRoutes = ['/dashboard', '/submit-complaint', '/create-profile'];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // If logged in and trying to access public-only routes (/, /login, /signup)
  // redirect to dashboard
  if (user && publicOnlyRoutes.some(route => path === route)) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  // If NOT logged in and trying to access private routes (/dashboard, /submit-complaint)
  // redirect to login
  if (!user && privateRoutes.some(route => path === route)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // Check if user has a profile if they are logged in
  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('user_id', user.id) // Correctly checking against user_id
      .single();

    // Log for debugging purposes
 
    // If there's an error fetching the profile or the user doesn't have a profile
    if (profileError || !profileData) {
      // Allow access only to create-profile if the user is logged in without a profile
      if (path !== '/create-profile') {

        const createProfileUrl = request.nextUrl.clone();
        createProfileUrl.pathname = '/create-profile';
        return NextResponse.redirect(createProfileUrl);
      }
    } else {
      // If a profile already exists and user tries to access create-profile
      if (path === '/create-profile') {
        console.log("User already has a profile. Redirecting to profile-created.");
        const profileCreatedUrl = request.nextUrl.clone();
        profileCreatedUrl.pathname = '/profile-created'; // The new page to redirect to
        return NextResponse.redirect(profileCreatedUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
