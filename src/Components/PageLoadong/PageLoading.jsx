import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loadingAnimation.json'

const PageLoading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className='min-h-screen w-full flex justify-center align-middle items-center'>
            <Lottie options={defaultOptions}
              height={250}
              width={250}
            //   isStopped={this.state.isStopped}
            //   isPaused={this.state.isPaused}
              />
        </div>
    );
};

export default PageLoading;