// src/components/Search.js

import { useState } from 'react';
import styles from "../stylesheets/Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/statsPage/" + search);
    }
    
    return (
        <>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div>
                        <h3 className={styles.text}>Enter your summoner name: </h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                            <input
                                className={styles.search}
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Summoner name..."
                                required
                            />
                            <input type="submit" value="Submit" className={styles.submit} />
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;