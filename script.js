document.addEventListener("DOMContentLoaded",function(){

    const searchBar=document.getElementById("user-input");
    const searchBtn=document.getElementById("search-btn");

    const totalQueSolve=document.querySelector(".total-que-num");
    const totalQueCircle=document.querySelector(".total-que-graph");

    const totalSubmissionDone=document.querySelector(".total-sub-num");

    const ratingDone=document.querySelector(".rating-num");

    const easyNum=document.querySelector(".Easy-que-num");
    const easyCircle=document.querySelector(".Easy-que-graph");

    const middleNum=document.querySelector(".Middle-que-num");
    const middleCircle=document.querySelector(".Middle-que-graph");

    const hardNum=document.querySelector(".Hard-que-num");
    const hardCircle=document.querySelector(".Hard-que-graph");


    function validusername(username){
        if(username.trim()==""){
            alert("username should not empty");
            return false;
        }

        const regex=/^[a-zA-Z0-9_-]{1,15}$/;
        const matching=regex.test(username);

        if(!matching){
            alert("invalid username");
        }

        return matching;


    }


    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }


    function displayUserDetails(parsedata){
        const totalQue=parsedata.totalQuestions;
        const totalSolve=parsedata.totalSolved;
        const submission=parsedata.acceptanceRate;
        const ranking=parsedata.ranking;

        const easysolve=parsedata.easySolved;
        const easytotal=parsedata.totalEasy;

        const middlesolve=parsedata.mediumSolved;
        const mediumtotal=parsedata.totalMedium;

        const hardsolve=parsedata.hardSolved;
        const hardtotal=parsedata.totalHard;

        updateProgress(totalSolve,totalQue,totalQueSolve,totalQueCircle);
        updateProgress(easysolve,easytotal,easyNum,easyCircle);
        updateProgress(middlesolve,mediumtotal,middleNum,middleCircle);
        updateProgress(hardsolve,hardtotal,hardNum,hardCircle);

        totalSubmissionDone.textContent=`${submission}`;
        ratingDone.textContent=`${ranking}`;

    }


    async function fetching(username){
            try{
                searchBtn.textContent="Searching..";
                searchBtn.disabled=true;

                const response=await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);

                if(!response.ok){
                    throw new Error("Unable to fetch the User details");
                }

                const parsedata=await response.json();
                console.log("parsedata ",parsedata);
                if(parsedata.status=='error'){
                    throw new Error(`${parsedata.message}`);
                }

                displayUserDetails(parsedata);

            }
            catch(error){
                alert(error);
            }
            finally{
                searchBtn.textContent="Search";
                searchBtn.disabled=false;

            }
    }




    searchBtn.addEventListener("click",function(){
        const username=searchBar.value;
        console.log("username ",username);

        if(validusername(username)){
            fetching(username);
        }
    })


    

})