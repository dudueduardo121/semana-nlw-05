import Image from 'next/image'
import { useContext, useRef, useEffect, useState } from 'react'
import { PlayerContext, usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export default function Player() {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0);

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        playNext,
        playPrevious,
        isLooping,
        toogleLoop,
        isShuffling,
        toogleShuffiling,
        hasNext,
        hasPrevious,
        setPlayingState,
        clearPlayState,
    } = usePlayer();

    useEffect(() => {
        if(!audioRef.current){
            return;
        }

        if(isPlaying) {
            audioRef.current.play()
        }else {
            audioRef.current.pause()
        }
    },[isPlaying])

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisode(){
        if(hasNext) {
            playNext()
        }else {
            clearPlayState()
        }

    }

    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando"/>
                <strong>Tocando agora </strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image
                        width={600}
                        height={392}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <p>{episode.members}</p>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}
            
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                           <Slider
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                            trackStyle={{background: '#04D361'}}
                            railStyle={{background: '#9f75ff'}}
                            handleStyle={{borderColor: '#04D361', borderWidth: 4}}
                           />
                        ) : (
                            <div className={styles.emptySlider}></div>
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        autoPlay
                        loop={isLooping}
                        ref={audioRef}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisode}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={toogleShuffiling} className={isShuffling ? styles.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button type="button" disabled={!episode} className={styles.playButton} onClick={togglePlay}>
                        {isPlaying 
                            ? <img src="/pause.svg" alt="Tocar"/>
                            : <img src="/play.svg" alt="Tocar"/>
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar proxima"/>
                    </button>
                    <button type="button" disabled={!episode} onClick={toogleLoop} className={isLooping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="repetir"/>
                    </button>
                </div>
            </footer>

        </div>
    )
}
