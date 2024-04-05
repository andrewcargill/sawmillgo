// Mock Firebase Auth
const mockAuth = {
    currentUser: {
      uid: 'testUid',
      email: 'user@example.com',
    },
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: mockAuth.currentUser })),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn((callback) => {
      callback(mockAuth.currentUser);
      return jest.fn(); // Return an unsubscribe function
    }),
  };
  
  // Mock Firebase module
  const firebase = {
    auth: () => mockAuth,
    // Add mocks for any other Firebase services you use here
  };
  
  export default firebase;
  