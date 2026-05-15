@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:'Poppins',sans-serif;

    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    overflow:hidden;

    background:url("images/clear.jpg");

    background-size:cover;
    background-position:center;

    position:relative;

    transition:0.5s;
}

/* Overlay */
.overlay{

    position:absolute;

    width:100%;
    height:100%;

    background:rgba(0,0,0,0.35);

    z-index:0;
}

/* Clouds */
.clouds{

    position:absolute;

    width:200%;
    height:100%;

    background:url("https://i.ibb.co/7rZz1kS/clouds.png")
    repeat-x;

    opacity:0.12;

    animation:moveClouds 80s linear infinite;

    z-index:1;
}

@keyframes moveClouds{

    from{
        transform:translateX(0);
    }

    to{
        transform:translateX(-50%);
    }
}

/* App Card */
.app-main{

    position:relative;

    z-index:5;

    width:95%;
    max-width:430px;

    padding:30px;

    border-radius:30px;

    background:rgba(255,255,255,0.15);

    backdrop-filter:blur(20px);

    border:1px solid rgba(255,255,255,0.2);

    box-shadow:0 8px 32px rgba(0,0,0,0.4);

    color:white;

    text-align:center;
}

/* Header */
.header h1{

    font-size:2rem;

    margin-bottom:25px;
}

/* Input */
.input-box{

    width:100%;

    padding:15px;

    border:none;
    outline:none;

    border-radius:15px;

    background:rgba(255,255,255,0.15);

    color:white;

    font-size:1rem;

    text-align:center;
}

.input-box::placeholder{
    color:#eee;
}

/* Weather */
.weather-body{

    display:none;

    margin-top:20px;

    padding:25px;

    border-radius:20px;

    background:rgba(0,0,0,0.2);
}

/* City */
.city{

    font-size:2rem;

    font-weight:600;
}

/* Temp */
.temp{

    font-size:5rem;

    margin:20px 0;
}

/* Details */
.details{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:15px;

    margin-top:20px;
}

.card{

    background:rgba(255,255,255,0.1);

    padding:15px;

    border-radius:15px;
}

/* Forecast */
.forecast{

    margin-top:20px;

    display:grid;

    grid-template-columns:repeat(5,1fr);

    gap:10px;
}

.forecast-card{

    background:rgba(255,255,255,0.12);

    padding:10px;

    border-radius:15px;
}

/* Chart */
#weatherChart{

    margin-top:20px;

    background:rgba(255,255,255,0.08);

    border-radius:20px;

    padding:10px;
}

/* Toggle */
#theme-toggle{

    position:absolute;

    top:20px;
    right:20px;

    width:45px;
    height:45px;

    border:none;

    border-radius:50%;

    background:rgba(255,255,255,0.15);

    color:white;

    cursor:pointer;

    z-index:10;
}

/* Mobile */
@media(max-width:700px){

    .forecast{
        grid-template-columns:repeat(2,1fr);
    }

    .temp{
        font-size:4rem;
    }
}
