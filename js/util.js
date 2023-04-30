/**
 * クリップボードにコピーする
 * @param {*} data 
 */
function copyToClipboard(data) {
    // クリップボードにコピーする
    navigator.clipboard.write(data).then(function() {
        copySuccess();
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
};

/**
 * 課題キーと件名をコピー完了のメッセージを表示する
 */
function copySuccess(){
    if (document.querySelector('#blg_status_bar') == null){
        const body = document.body;
        body.insertAdjacentHTML('beforeend','<div id="blg_status_bar" class="flash-message" style="position: fixed; bottom: 40%; left: 0px; right: 0px; height: 48px; z-index: 1000; display: none;"><div id="blg_status_bar_text" class="flash-message__text" style="z-index: 1020; position: absolute; inset: 0px;">課題キーと件名をクリップボードにコピーしました</div><div id="blg_status_bar_bg" class="flash-message__bg" style="position: absolute; inset: 0px; z-index: 1010; opacity: 0.95;"></div></div>')
    }
    // ボタンを追加する場所を選択
    document.querySelector('#blg_status_bar').style.display='';
    setTimeout('document.querySelector("#blg_status_bar").style.display="none";', 3000);
}