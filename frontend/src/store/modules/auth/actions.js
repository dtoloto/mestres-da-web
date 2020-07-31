export function signInRequest({ email, password }) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess({ token }) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  }
}

export function signUpRequest({ email, password }) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { email, password },
  };
}

export function signUpSuccess({ token }) {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    payload: { token },
  };
}

export function signUpFailure() {
  return {
    type: '@auth/SIGN_UP_FAILURE',
  }
}

export function disableLoader() {
  return {
    type: '@auth/DISABLE_LOADER',
  }
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  }
}