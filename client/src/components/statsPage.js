// src/components/Search.js

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "../stylesheets/Stats.module.css";

function StatsPage() {
    const [mastery, setMastery] = useState("");
    const [matches, setMatches] = useState("");
    const [userData, setUserData] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/statsPage/" + search);
        window.location.reload();
    }

    useEffect(() => {
        var name = window.location.pathname.split('/')[2];
        name = name.replace("%20", "");
        console.log(name);
        fetch("http://localhost:3001/playerData/NA1/" + name).then(res => res.json()).then((e) => {
            if (e.error) {
                console.log(e.error);
                navigate("/");
            }
            if (e) {
                console.log(e);
                setMastery(e.mastery);
                setMatches(e.matches);
                setUserData(e.userData);
            } else {
                navigate("/");
            }
        });
    }, []);

    function SetChampions() {
        var content = [];
        for (var i = 0; i < mastery.length; i++) {
            content.push(
                (
                    <div className={styles.championBox}>
                        <div className={styles.championIcon}><img style={{ width: '45px', height: '45px', borderRadius: '10px' }} src={mastery[i].url}></img></div>
                        <div className={styles.championInfo}><span>{mastery[i].champion}</span></div>
                        <div className={styles.championMastery}><span>Score: {mastery[i].points}</span></div>
                    </div>
                )
            );
        }
        return content;
    }

    function SetMatches() {
        var content = [];
        for (var i = 0; i < matches.length; i++) {
            content.push(
                (
                    <div className={styles.matchBox}>
                        <div className={styles.matchChampion}><span>{matches[i].champion}</span></div>
                        <div className={styles.matchKDA}>
                            <div>
                                <span className={styles.matchKDA}>{matches[i].kills} / {matches[i].deaths} / {matches[i].assists} </span>
                            </div>
                        </div>
                        <div className={styles.matchItems}>
                            <div>
                                <div className={styles.items}>
                                    <ul style={{ width: '80px', listStyle: 'none' }}>
                                        {
                                            Array.apply(0, Array(6)).map((item, index) => {
                                                return (
                                                    <li className={styles.item}>
                                                        <img style={{ maxWidth: '100%' }} src={!matches[i][`item${index}URL`].includes("0.png") ? matches[i][`item${index}URL`] : ""}></img>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.matchPlayers}>
                            <ul style={{ float: 'left', height: '96px' }}>
                                {
                                    Array.apply(0, Array(5)).map((item, index) => {
                                        return (
                                            <li className={styles.player}>
                                                <a href={`/statsPage/${matches[i].participants[index]?.summoner}`} onClick={() => {window.location.reload()}}><div className={styles.playerName}><span className={styles.nameText}>{matches[i].participants[index]?.summoner}</span></div></a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <ul style={{ float: 'left', height: '96px' }}>
                                {
                                    Array.apply(0, Array(5)).map((item, index) => {
                                        return (
                                            <li className={styles.player}>
                                                <a href={`/statsPage/${matches[i].participants[index + 5]?.summoner}`} onClick={() => {window.location.reload()}}><div className={styles.playerName}><span className={styles.nameText}>{matches[i].participants[index + 5]?.summoner}</span></div></a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            );
        }
        return content;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.statsPage}>
                    <div className={styles.searchBox}>
                        <a className={styles.title} href="/">
                            <button className={styles.titleButton}>LeagueTracker</button>
                        </a>
                        <form onSubmit={handleSubmit} style={{ display: 'inline-flex', justifyContent: 'end', width: '100%' }}>
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
                    <div className={styles.summonerInfo}>
                        <img className={styles.summonerIcon} src={userData.profilePicture ? userData.profilePicture : "/NOPROFILE.png"}></img>
                        <span className={styles.summonerName}>{userData.username}</span>
                        <span className={styles.summonerLevel}>Level - {userData.summonerLevel} </span>
                    </div>
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        <div style={{ display: 'inline-block', width: '33%', fontSize: '12px', verticalAlign: 'top', minHeight: '100vh' }}>
                            <div style={{ border: '1px solid #cdd2s2', background: '#dcdfdf', borderRadius: '2px', marginTop: '10px' }}>
                                <div style={{ display: 'table', width: '100%', color: '#879292', position: 'relative', backgroundColor: '#f2f2f2', padding: '8px 8px' }}>
                                    <div style={{ display: 'table-cell', verticalAlign: 'bottom', width: '130px', height: '124px', textAlign: 'center', paddingRight: '20px' }}>
                                        <img className={styles.summonerRankIcon} src={userData.ranked?.RANKED_SOLO_5x5 ? "/" + userData.ranked.RANKED_SOLO_5x5.tier + ".png" : "/UNRANKED.png"}></img>
                                    </div>
                                    <div style={{ display: 'table-cell', verticalAlign: 'middle', fontSize: '12px', lineHeight: '1.3', textAlign: 'left' }}>
                                        <div>Solo/Duo</div>
                                        <div style={{ fontWeight: 'bold' }}>{userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_SOLO_5x5.tier : ""} {userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_SOLO_5x5.rank : ""}</div>
                                        <div style={{ fontWeight: '600' }}>{userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_SOLO_5x5.leaguePoints + "LP /" : "UNRANKED"} {userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_SOLO_5x5.wins + "W" : ""} {userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_SOLO_5x5.losses + "L" : ""}</div>
                                        <div style={{ fontWeight: '300' }}>{userData.ranked?.RANKED_SOLO_5x5 ? "Win Rate: " + Math.round(userData.ranked.RANKED_SOLO_5x5.winrate * 100) + "%" : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #cdd2s2', background: '#dcdfdf', borderRadius: '2px', marginTop: '10px' }}>
                                <div style={{ display: 'table', width: '100%', color: '#879292', position: 'relative', backgroundColor: '#f2f2f2', padding: '8px 8px' }}>
                                    <div style={{ display: 'table-cell', verticalAlign: 'bottom', width: '130px', height: '124px', textAlign: 'center', paddingRight: '20px' }}>
                                        <img className={styles.summonerRankIcon} src={userData.ranked?.RANKED_FLEX_SR ? "/" + userData.ranked.RANKED_FLEX_SR.tier + ".png" : "/UNRANKED.png"}></img>
                                    </div>
                                    <div style={{ display: 'table-cell', verticalAlign: 'middle', fontSize: '12px', lineHeight: '1.3', textAlign: 'left' }}>
                                        <div>Flex</div>
                                        <div style={{ fontWeight: 'bold' }}>{userData.ranked?.RANKED_FLEX_SR ? userData.ranked.RANKED_FLEX_SR.tier : ""} {userData.ranked?.RANKED_SOLO_5x5 ? userData.ranked.RANKED_FLEX_SR.rank : ""}</div>
                                        <div style={{ fontWeight: '600' }}>{userData.ranked?.RANKED_FLEX_SR ? userData.ranked.RANKED_FLEX_SR.leaguePoints + "LP /" : "UNRANKED"} {userData.ranked?.RANKED_FLEX_SR ? userData.ranked.RANKED_FLEX_SR.wins + "W" : ""} {userData.ranked?.RANKED_FLEX_SR ? userData.ranked.RANKED_FLEX_SR.losses + "L" : ""}</div>
                                        <div style={{ fontWeight: '300' }}>{userData.ranked?.RANKED_FLEX_SR ? "Win Rate: " + Math.round(userData.ranked.RANKED_FLEX_SR.winrate * 100) + "%" : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #cdd2s2', background: '#dcdfdf', borderRadius: '2px', marginTop: '10px' }}>
                                <div style={{ display: 'table', width: '100%', color: '#879292', position: 'relative', backgroundColor: '#f2f2f2', padding: '8px 8px' }}>
                                    <div className={styles.mastery}>Champions</div>
                                    <div><SetChampions /></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', display: 'inline-block', width: '50%', marginTop: '10px', marginLeft: '44px', fontSize: '12px', verticalAlign: 'top', minHeight: '100vh' }}>
                            <div className={styles.matches}>Matches</div>
                            <div><SetMatches /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StatsPage;