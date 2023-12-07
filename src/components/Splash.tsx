const Splash = () => {
  return (
    <div>
      <b className="logo">GRDC Trials</b>
      {/* <style jsx global>{` */}
      {/*   html, */}
      {/*   body { */}
      {/*     overflow-y: hidden; */}
      {/*     perspective: none; */}
      {/*   } */}
      {/* `}</style> */}
      <style jsx>{`
        div {
          background: white;
          justify-content: center;
          align-items: center;
          display: flex;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          zindex: 667;
          flexflow: column;
          margin: auto;
        }
        img {
          width: 15vw;
          margin: 0 0 34px;
        }
        b {
          font-size: 3em;
        }
        .logo {
          animation: loader 2s;
          animationiterationcount: infinite;
        }
        @keyframes loader {
          0% {
            opacity: 0.618;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.618;
          }
        }
        @media screen and (max-width: 768px) {
          img {
            margin: 0 0 21px;
          }
        }
        @media screen and (max-width: 480px) {
          img {
            width: 20vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Splash;
