import { useRef, useState } from 'react';
import './App.css';
import AstroCat from '/img/astrocat.svg';
import { motion } from 'framer-motion';

function App() {
  const constraintsRef = useRef(null);
  const [count, setCount] = useState(0);
  const [plus, setPlus] = useState(null);
  const meowSound = new Audio('/sounds/meow.wav');
  const meow2Sound = new Audio('/sounds/meow2.wav');

  const handleClick = () => {
    let score = Math.random() * 100 > 90 ? 5 : 1;
    setCount(count + score);
    setPlus(
      <motion.div
        key={count}
        initial={{ opacity: 1, y: -100 }}
        animate={{ opacity: 0, y: -250, x: Math.random() * 100 * Math.sign(Math.random() - 0.5)}}
        transition={{ ease: 'easeOut', duration: 0.5 }}
        className='absolute text-6xl font-bold top-1/2 left-1/2'
        onAnimationComplete={() => setPlus(null)}
      >
        <span className={score === 1 ? "text-white" : "text-amber-300"}>{"+"}{score}</span>
      </motion.div>
    );
    // playPlusSound();
    if (score === 1) {
      meowSound.play();
    } else {
      meow2Sound.play();
    }
  };

  return (
    <main
      className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden'
      ref={constraintsRef}
    >
      <motion.div
        className='w-72 hover:cursor-grab active:cursor-grabbing'
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={1}
        onClick={handleClick}
      >
        {plus}
        <motion.img
          src={AstroCat}
          alt='AstroCat'
          className='pointer-events-none'
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <p className='absolute bottom-0 right-0 m-4 text-xl font-bold text-white'>
        {count}
      </p>
    </main>
  );
}

export default App;
