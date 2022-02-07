import React from "react";
import classNames from "classnames";
import { DualRing } from "react-css-spinners/dist/DualRing";

import './style.scss';

import Card from '../Card';

const Home = ({ loading, posts, light, changeColor }) => {
    return (
        <>
            <title>Limit Break</title>
            <div className="home">
                <div className={classNames ("home-header", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    <h1 className="home-header-title">Limit Break</h1>
                    <h2  className="home-header-subtitle">Le blog qui vous parle de jeux vidéo.</h2>
                    <div className="home-header-switch">
                        <button 
                            className="home-header-switch-button"
                            onClick={() => changeColor()}
                        >
                            {light ? (
                                <div className="home-header-switch-button-dark">
                                    <svg 
                                        version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="24px" height="24px" viewBox="0 0 1049.000000 1280.000000"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
                                        <path d="M6015 12789 c-740 -46 -1469 -219 -2145 -509 -284 -121 -817 -407
                                        -985 -528 -22 -15 -108 -77 -191 -136 -179 -126 -366 -275 -521 -412 -163
                                        -144 -375 -344 -398 -375 -11 -15 -63 -74 -115 -131 -1223 -1342 -1815 -3153
                                        -1624 -4968 153 -1459 796 -2809 1835 -3849 665 -665 1429 -1156 2315 -1486
                                        406 -151 865 -268 1304 -330 341 -48 510 -59 900 -59 374 -1 519 8 810 45 85
                                        11 182 23 215 25 33 3 121 19 195 35 707 160 1097 293 1625 554 386 191 672
                                        366 1000 612 261 196 285 223 237 271 -17 17 -43 20 -233 25 -1742 51 -3386
                                        839 -4545 2177 -1184 1368 -1717 3206 -1453 5010 218 1494 969 2854 2124 3849
                                        116 100 115 98 115 132 0 52 -22 59 -186 58 -82 -1 -207 -6 -279 -10z"/>
                                        </g>
                                    </svg>
                                </div>
                            ) : (
                                <div className="home-header-switch-button-light">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="24px" height="24px" viewBox="0 0 1280.000000 1280.000000"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
                                        <path d="M6094 10752 c-166 -1109 -300 -2018 -299 -2020 1 -1 58 9 126 22 311
                                        63 647 63 958 0 68 -13 125 -23 126 -22 4 5 -600 4038 -605 4038 -3 0 -141
                                        -908 -306 -2018z"/>
                                        <path d="M1855 10910 c24 -39 2458 -3280 2464 -3280 3 0 22 25 40 57 148 246
                                        443 544 717 723 l102 66 -1622 1191 c-891 656 -1641 1207 -1666 1225 -24 18
                                        -40 26 -35 18z"/>
                                        <path d="M9284 9697 l-1662 -1221 102 -66 c276 -180 570 -477 719 -727 18 -29
                                        35 -53 38 -53 5 0 2440 3240 2463 3278 4 6 6 12 4 12 -2 -1 -751 -551 -1664
                                        -1223z"/>
                                        <path d="M6195 8369 c-377 -39 -750 -193 -1044 -430 -389 -313 -647 -762 -716
                                        -1250 -19 -133 -19 -414 0 -544 59 -415 241 -786 534 -1088 601 -620 1533
                                        -783 2306 -403 223 109 387 229 556 403 293 302 475 673 534 1088 19 130 19
                                        411 0 544 -92 649 -506 1207 -1110 1497 -319 153 -705 220 -1060 183z"/>
                                        <path d="M2033 6720 c-1732 -254 -2062 -304 -2032 -311 28 -6 4055 -595 4057
                                        -593 2 1 -6 45 -17 96 -67 311 -67 694 0 1003 11 53 19 98 17 99 -2 1 -913
                                        -131 -2025 -294z"/>
                                        <path d="M8740 7009 c0 -5 9 -50 20 -100 66 -297 66 -687 -1 -997 -11 -51 -19
                                        -95 -17 -96 6 -5 4047 590 4054 596 3 4 -4 9 -17 12 -13 3 -919 136 -2014 296
                                        -1094 159 -1998 292 -2007 294 -10 2 -18 0 -18 -5z"/>
                                        <path d="M3095 3574 c-671 -894 -1227 -1635 -1235 -1647 -19 -27 -232 -182
                                        1672 1217 l1646 1210 -101 66 c-275 179 -566 472 -718 723 -19 31 -36 57 -39
                                        57 -3 0 -554 -732 -1225 -1626z"/>
                                        <path d="M8441 5143 c-152 -251 -443 -544 -718 -723 l-101 -66 1621 -1192
                                        c892 -655 1641 -1205 1665 -1222 23 -18 42 -30 42 -27 0 8 -2461 3282 -2468
                                        3284 -4 1 -22 -23 -41 -54z"/>
                                        <path d="M5792 4088 c3 -7 139 -916 304 -2020 164 -1105 301 -2008 304 -2008
                                        5 0 609 4033 605 4038 -1 1 -58 -8 -126 -22 -172 -35 -292 -46 -479 -46 -187
                                        0 -307 11 -477 46 -143 28 -136 28 -131 12z"/>
                                        </g>
                                    </svg>
                                </div>
                            ) }
                        </button>
                    </div>
                </div>
                
                <div className={classNames ("home-posts", {"bk-p--light" : light === true, "bk-p--dark" : light === false})}>
                    <ul className="home-posts-list">
                        {loading && <DualRing color="#000" />}
                        {!loading && posts.map((post) => (
                            <Card
                                key={post.id}
                                {...post}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
    }
export default Home;