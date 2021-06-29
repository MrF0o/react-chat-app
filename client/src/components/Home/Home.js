import { useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

    let [roomCode, setRoomCode] = useState('');
    let [username, setUserName] = useState('');

    return (
        <div className="HomeContainer">
            <div className="FormContainer">
                <div>
                    <input className="HomeIn" type="text" placeholder="Room Code" onChange={(event) => setRoomCode(event.target.value)} />
                </div>
                <div>
                    <input className="HomeIn" type="text" placeholder="UserName" onChange={(event) => setUserName(event.target.value)} />
                </div>

                <Link onClick={(event) => (!roomCode || !username) ? event.preventDefault() : null} to={`/chat?roomcode=${roomCode}&username=${username}`} >
                    <div>
                        <button className="Homebtn">Join</button>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;