import { FirebaseError } from 'firebase/app';

export const getFirebaseAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    console.warn('🔥 FirebaseError code:', error.code);

    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return '아이디 또는 비밀번호가 올바르지 않습니다.';

      case 'auth/invalid-email':
        return '유효하지 않은 이메일 형식입니다.';
      case 'auth/user-disabled':
        return '로그인할 수 없는 계정입니다.';
      case 'auth/too-many-requests':
        return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
      case 'auth/network-request-failed':
        return '네트워크 오류입니다. 인터넷 연결을 확인해주세요.';
      case 'auth/internal-error':
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/weak-password':
        return '비밀번호는 최소 8자 이상이어야 합니다.';
      case 'auth/operation-not-allowed':
        return '이메일/비밀번호 가입이 허용되어 있지 않습니다.';

      case 'auth/missing-email':
        return '이메일을 입력해주세요.';

      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  }

  return '알 수 없는 오류가 발생했습니다.';
};
