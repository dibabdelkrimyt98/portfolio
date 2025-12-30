import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from './firebase';

// Layout & UI Components
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import FeedbackModal from './components/modals/FeedbackModal';
import WelcomeModal from './components/modals/WelcomeModal';
import QuoteModal from './components/sections/QuoteModal';

// Sections
import Collaborators from './components/sections/Collaborators';
import ContactForm from './components/sections/ContactForm';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import WorksTimeline from './components/sections/WorksTimeline';

function App() {
  const [isDevisOpen, setIsDevisOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [comments, setComments] = useState([]);

  // --- 1. REAL-TIME FETCHING ---
  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe(); 
  }, []);

  // --- 2. ADD COMMENT TO FIREBASE ---
  const addComment = async (newComment) => {
    try {
      await addDoc(collection(db, "feedbacks"), {
        name: newComment.name,
        product: newComment.product,
        text: newComment.text,
        rating: newComment.rating,
        date: newComment.date,
        likes: 0,
        createdAt: serverTimestamp() 
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // --- 3. HANDLE LIKE (ATOMIC) ---
  const handleLike = async (commentId) => {
    try {
      const commentRef = doc(db, "feedbacks", commentId);
      await updateDoc(commentRef, {
        likes: increment(1)
      });
    } catch (e) {
      console.error("Error updating likes: ", e);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-blue-500/30">
      {/* Background Decorations (Optional) */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(5,5,5,1))] z-[-1]" />
      
      <WelcomeModal />
      
      <Navbar 
        onOpenDevis={() => setIsDevisOpen(true)} 
        onOpenFeedback={() => setIsFeedbackOpen(true)} 
      />

      <main className="pt-20">
        <Hero />
        <WorksTimeline />
        
        <Collaborators 
          comments={comments} 
          onLike={handleLike} 
        />
        
        <Experience />
        <ContactForm />
      </main>

      <Footer />

      {/* Modals placed at root level for proper z-index layering */}
      <QuoteModal 
        isOpen={isDevisOpen} 
        onClose={() => setIsDevisOpen(false)} 
      />
      
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        onAddComment={addComment} 
      />
    </div>
  );
}

export default App;