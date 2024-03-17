function kinkSelect(category){
  kinks = document.querySelector('#kinks')
  kl = kinks.length
  for(let i=0; i<kl;i++){
    if(kinks[i].classList==category){
      kinks[i].selected = true
    }
  }
}

function ckinkSelect(text){
  ck = document.querySelector('#customKinks')
  ckl = ck.length
  for(let i=0;i<ckl;i++){
    if(ck[i].innerText == text){
      document.querySelector('#customKinks')[i].selected = true
    }
  }
}

function kinksPlacer(categories, kinkText){
  for(ii=0;ii<4;ii++){
    kinkSelect(categories[ii])
    ckinkSelect(kinkText[ii])
    document.querySelector('#addKink').click()
  }
}

function textPicker(){
  faveText = document.querySelector("#fave").value
  yesText = document.querySelector("#yes").value
  maybeText = document.querySelector("#maybe").value
  noText = document.querySelector("#no").value
  return [faveText, yesText, maybeText, noText]
}

function organiseKinks(){
  categories = ["fave", "yes", "maybe", "no"]
  kinkText = textPicker()
  groupCount = document.querySelector("#groups").children[1].childElementCount

  for(j=0;j<groupCount;j++){
    document.querySelector('#groups').children[1][j].selected = true;
    FList.Subfetish.Ui.populateKinks();
    FList.Subfetish.Ui.Lists.Cache.recache('groups');
    kinksPlacer(categories, kinkText)
	}
}

document.getElementById('description').insertAdjacentHTML("beforebegin", "<div id='kinkAutomationLabels'>")

document.querySelector('#kinkAutomationLabels').innerHTML = `<h3>Custom Kink Names</h3>\
<table>\
<form>\
<tr><td><label for='fave'>Fave: </label>    </td><td><input type='text' id='fave' name='fave'></input></td></tr>\
<tr><td><label for='yes'>Yes: </label>      </td><td><input type='text' id='yes' name='yes'></input></td></tr>\
<tr><td><label for='maybe'>Maybe: </label>  </td><td><input type='text' id='maybe' name='maybe'></input></td></tr>\
<tr><td><label for='no'>No: </label>        </td><td><input type='text' id='no' name='no'></input></td></tr>\
<tr><td><button id="organiseKinks"'>Click here to organise kinks</button></td></tr>\
</form></table>`;

document.querySelector("#organiseKinks").addEventListener('click', function(e){
  return organiseKinks();
})