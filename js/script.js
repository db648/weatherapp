function weatherMap(){
    let city=document.querySelector("#mapsearch").value;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce571994a30e12023fe20cc7b5933f5a&units=metric&units=standard`;
    
    async function getWeather(){
        try{
            let res=await fetch(url);
            let data=await res.json();
            showWeather(data);
            // console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }
    getWeather();
    function showWeather(weather){
        document.getElementById("details").innerHTML="";
        document.querySelector("#map").innerHTML="";

        let h3 = document.createElement("h3");
        h3.innerText = "Weather Details";
        h3.style.color="aqua";

        let temp=document.createElement("p");
        temp.innerText=`Tempareture : ${weather.main.temp}°`;
        let maxtemp=document.createElement("p");
        maxtemp.innerText=`Max_Tempareture : ${weather.main.temp_max}°`;

        let mintemp=document.createElement("p");
        mintemp.innerText=`Max_Tempareture : ${weather.main.temp_min}°`;

        let wind=document.createElement("p");
        wind.innerText=`Wind Speed: ${weather.wind.speed}km/h`;

        let clounds=document.createElement("p");
        clounds.innerText=`Clounds : ${weather.clouds.all}`;

        // converting sec to day and setting local time zone
        var sec=weather.sys.sunrise;
        var date=new Date(sec*1000);
        var timestr=date.toLocaleTimeString();

        let sunrise=document.createElement("p");
        sunrise.innerText=`Sunrise : ${timestr}`;

        // converting sec to day and setting local time zone
        var secs=weather.sys.sunset;
        var date1=new Date(secs*1000);
        var time=date1.toLocaleTimeString();

        let sunset=document.createElement("p");
        sunset.innerText=`Sunset : ${time}`;

        document.getElementById("details").append(h3,temp,maxtemp,mintemp,wind,sunrise,sunset);

        document.querySelector("#map").innerHTML=`<iframe width="100%" height="100%" 
         src="https://maps.google.com/maps?q=${city}&2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
         frameborder="0" scrolling="no" marginheight="0" 
         marginwidth="0"
        </iframe>`;

        async function daysReport(){
            try{
                let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=currently,minutely,hourly&appid=ce571994a30e12023fe20cc7b5933f5a`);
                let data1 = await response.json();
                console.log(data1);
                showDays(data1);
            }
            catch(err){
                console.log(err)
            }
        }
        daysReport();

    }

    function showDays(data1){
        document.querySelector("#days").innerHTML="";
        data1.daily.map(function(e){
            let div=document.createElement("div");
            div.setAttribute("id","daysdivjs")
            var day=document.createElement("p");
            var seconds=e.dt;
            var datee=new Date(seconds*1000);
            //var time1=datee.toLocaleDateString();
            var time1=datee.toString().split(" ").slice(0,4).join(" ");                
            day.innerText=time1;

            let img=document.createElement("img");
            img.src=`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`;
            
            let maxtemp=document.createElement("p");
            maxtemp.innerHTML=`${e.temp.max}°<sup>C</sup>`;

            let mintemp=document.createElement("p");
            mintemp.innerHTML=`${e.temp.min}°<sup>C</sup>`;

            div.append(day,img,maxtemp,mintemp);
            document.querySelector("#days").append(div)
        });
    }
    

}