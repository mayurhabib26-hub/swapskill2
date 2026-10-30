import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Session,
  CreditTransaction,
  Conversation,
  Message,
  Review,
  DisputeReport,
} from '../types';
import {
  CURRENT_USER,
  MOCK_USERS,
  INITIAL_SESSIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_REVIEWS,
  INITIAL_DISPUTES,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User;
  users: User[];
  sessions: Session[];
  transactions: CreditTransaction[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  reviews: Review[];
  disputes: DisputeReport[];
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  requestSession: (booking: Omit<Session, 'id' | 'createdAt' | 'status' | 'creditCost' | 'creditHeld' | 'teacherConfirmed' | 'learnerConfirmed'>) => void;
  acceptSession: (sessionId: string) => void;
  declineSession: (sessionId: string) => void;
  cancelSession: (sessionId: string) => void;
  markSessionCompleted: (sessionId: string) => void;
  confirmSessionCompletion: (sessionId: string) => void;
  addReview: (sessionId: string, recipientId: string, rating: number, comment: string, skillName: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrGetConversation: (peerId: string) => string;
  updateCurrentUserProfile: (updated: Partial<User>) => void;
  switchUserRole: (role: 'student' | 'admin') => void;
  resolveDispute: (disputeId: string, action: 'resolve' | 'refund' | 'dismiss') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('swapskill_current_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('swapskill_users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('swapskill_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem('swapskill_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('swapskill_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('swapskill_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('swapskill_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [disputes, setDisputes] = useState<DisputeReport[]>(() => {
    const saved = localStorage.getItem('swapskill_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist demo state
  useEffect(() => {
    localStorage.setItem('swapskill_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('swapskill_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('swapskill_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('swapskill_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('swapskill_messages', JSON.stringify(messages));
  }, [messages]);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchUserRole = (role: 'student' | 'admin') => {
    setCurrentUser((prev) => ({ ...prev, role }));
    addToast(
      role === 'admin' ? 'Switched to Demo Admin Mode' : 'Switched to Student Mode',
      role === 'admin' ? 'Full platform monitoring and dispute resolution enabled.' : 'Viewing from Alex Chen\'s perspective.',
      'info'
    );
  };

  const updateCurrentUserProfile = (updated: Partial<User>) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updated };
      setUsers((uList) => uList.map((u) => (u.id === prev.id ? next : u)));
      return next;
    });
    addToast('Profile updated successfully!', 'Your changes have been saved to your profile.', 'success');
  };

  // 1. Request a Session: Note: does NOT deduct or hold credit yet!
  const requestSession = (booking: Omit<Session, 'id' | 'createdAt' | 'status' | 'creditCost' | 'creditHeld' | 'teacherConfirmed' | 'learnerConfirmed'>) => {
    const newSession: Session = {
      ...booking,
      id: 'ses_' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'requested',
      creditCost: 1,
      creditHeld: false,
      teacherConfirmed: false,
      learnerConfirmed: false,
    };

    setSessions((prev) => [newSession, ...prev]);
    addToast(
      'Session request submitted!',
      `Waiting for ${booking.teacherName} to accept. 1 credit will be held in escrow upon acceptance.`,
      'info'
    );
  };

  // 2. Accept Session: When teacher accepts, 1 credit is held in escrow from the learner!
  const acceptSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        return {
          ...s,
          status: 'accepted',
          creditHeld: true,
          meetingLocationOrLink: s.meetingLocationOrLink || 'https://meet.google.com/swp-' + Math.random().toString(36).substring(2, 8),
        };
      })
    );

    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      // If current user is the learner, hold 1 credit from available to held!
      if (session.learnerId === currentUser.id) {
        setCurrentUser((u) => ({
          ...u,
          creditsAvailable: Math.max(0, u.creditsAvailable - 1),
          creditsHeld: u.creditsHeld + 1,
        }));
      }

      // Add Escrow Hold transaction
      const newTx: CreditTransaction = {
        id: 'tx_' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: 'held',
        sessionId: session.id,
        sessionTitle: `${session.skillName} with ${session.teacherName}`,
        amount: -1,
        status: 'escrow',
        description: `Session accepted: 1 Credit held in escrow for ${session.skillName}.`,
      };
      setTransactions((prev) => [newTx, ...prev]);
    }

    addToast(
      'Session accepted!',
      '1 credit is securely placed into escrow until the session is completed.',
      'success'
    );
  };

  // 3. Decline Session
  const declineSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'declined' } : s))
    );
    addToast('Session request declined', 'The requester has been notified.', 'info');
  };

  // 4. Cancel Session: If credit was held, refund it back!
  const cancelSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    if (session.creditHeld) {
      if (session.learnerId === currentUser.id) {
        setCurrentUser((u) => ({
          ...u,
          creditsAvailable: u.creditsAvailable + 1,
          creditsHeld: Math.max(0, u.creditsHeld - 1),
        }));
      }
      const refundTx: CreditTransaction = {
        id: 'tx_' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: 'refunded',
        sessionId: session.id,
        sessionTitle: `${session.skillName}`,
        amount: 1,
        status: 'completed',
        description: 'Session cancelled: 1 Credit returned from escrow to available balance.',
      };
      setTransactions((prev) => [refundTx, ...prev]);
    }

    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'cancelled', creditHeld: false } : s))
    );
    addToast('Session cancelled', 'The held credit (if any) was returned to the learner.', 'warning');
  };

  // 5. Mark Completed by one party
  const markSessionCompleted = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const isTeacher = session.teacherId === currentUser.id;
    const isLearner = session.learnerId === currentUser.id;

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const teacherConfirmed = isTeacher ? true : s.teacherConfirmed;
        const learnerConfirmed = isLearner ? true : s.learnerConfirmed;
        const bothConfirmed = teacherConfirmed && learnerConfirmed;

        return {
          ...s,
          teacherConfirmed,
          learnerConfirmed,
          status: bothConfirmed ? 'settled' : 'awaiting_confirmation',
        };
      })
    );

    addToast(
      'Session marked as complete!',
      'Waiting for partner confirmation to release the held credit.',
      'info'
    );
  };

  // 6. Confirm Session Completion -> Releases credit from escrow to teacher!
  const confirmSessionCompletion = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || session.status === 'settled') return;

    const isTeacher = session.teacherId === currentUser.id;
    const isLearner = session.learnerId === currentUser.id;

    // Settle session
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        return {
          ...s,
          teacherConfirmed: true,
          learnerConfirmed: true,
          status: 'settled',
          creditHeld: false,
        };
      })
    );

    // If current user was learner, reduce creditsHeld by 1
    if (isLearner) {
      setCurrentUser((u) => ({
        ...u,
        creditsHeld: Math.max(0, u.creditsHeld - 1),
      }));
    }

    // If current user was teacher, increase creditsAvailable by 1!
    if (isTeacher) {
      setCurrentUser((u) => ({
        ...u,
        creditsAvailable: u.creditsAvailable + 1,
      }));
    }

    // Add Released transaction
    const releaseTx: CreditTransaction = {
      id: 'tx_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: isTeacher ? 'earned' : 'released',
      sessionId: session.id,
      sessionTitle: `${session.skillName}`,
      amount: 1,
      status: 'completed',
      description: isTeacher
        ? `Taught 30m session on ${session.skillName}: +1 Credit earned.`
        : `Mutual confirmation complete: 1 Credit transferred to ${session.teacherName}.`,
    };

    setTransactions((prev) => [releaseTx, ...prev]);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#063F83', '#C5E9DC', '#1769AA', '#16845B'],
      });
    } catch {
      // ignore
    }

    addToast(
      'Session confirmed and settled!',
      '1 credit has been released to the teacher. Thank you for learning together!',
      'success'
    );
  };

  // 7. Add Review
  const addReview = (sessionId: string, recipientId: string, rating: number, comment: string, skillName: string) => {
    const newRev: Review = {
      id: 'rev_' + Date.now(),
      sessionId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      recipientId,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      skillName,
    };

    setReviews((prev) => [newRev, ...prev]);
    addToast('Review submitted!', 'Thank you for giving valuable feedback to your peer.', 'success');
  };

  // 8. Chat & Messaging
  const sendMessage = (conversationId: string, text: string) => {
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      receiverId: conv.participantId,
      text,
      timestamp: 'Just now',
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: text, lastMessageTimestamp: 'Just now' }
          : c
      )
    );

    // Auto simulated peer reply for lively demo!
    setTimeout(() => {
      const peerReply: Message = {
        id: 'msg_reply_' + Date.now(),
        conversationId,
        senderId: conv.participantId,
        receiverId: currentUser.id,
        text: `Thanks for the message! I'm prepping materials for our skill session. Let me know if you need any links beforehand!`,
        timestamp: 'Just now',
        read: false,
      };

      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), peerReply],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: peerReply.text,
                lastMessageTimestamp: 'Just now',
                unreadCount: c.unreadCount + 1,
              }
            : c
        )
      );
    }, 1800);
  };

  const startOrGetConversation = (peerId: string): string => {
    const existing = conversations.find((c) => c.participantId === peerId);
    if (existing) return existing.id;

    const peer = users.find((u) => u.id === peerId);
    const newConvId = 'conv_' + (peer ? peer.name.toLowerCase().replace(/\s+/g, '_') : Date.now());

    const newConv: Conversation = {
      id: newConvId,
      participantId: peerId,
      participantName: peer ? peer.name : 'Peer',
      participantAvatar: peer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      participantMajor: peer?.major || 'Student',
      participantSkill: peer?.skillsTeaching[0]?.skillName || 'Skill Exchange',
      lastMessage: 'Started a new conversation',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({ ...prev, [newConvId]: [] }));
    return newConvId;
  };

  // 9. Admin Disputes
  const resolveDispute = (disputeId: string, action: 'resolve' | 'refund' | 'dismiss') => {
    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id !== disputeId) return d;
        if (action === 'dismiss') return { ...d, status: 'dismissed' };
        return { ...d, status: 'resolved' };
      })
    );

    if (action === 'refund') {
      addToast('Dispute resolved with Credit Refund', 'The held credit was returned to the reporting user.', 'success');
    } else if (action === 'resolve') {
      addToast('Dispute marked as Resolved', 'Both parties have been notified of resolution.', 'success');
    } else {
      addToast('Dispute dismissed', 'No policy violation was found.', 'info');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        sessions,
        transactions,
        conversations,
        messages,
        reviews,
        disputes,
        toasts,
        addToast,
        removeToast,
        requestSession,
        acceptSession,
        declineSession,
        cancelSession,
        markSessionCompleted,
        confirmSessionCompletion,
        addReview,
        sendMessage,
        startOrGetConversation,
        updateCurrentUserProfile,
        switchUserRole,
        resolveDispute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
