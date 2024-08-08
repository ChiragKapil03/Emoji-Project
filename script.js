let emoji_container = document.getElementById("emoje_container");
let search_field = document.getElementById("search_field");
let enlarged_emoji = document.getElementById("enlarged_emoji");

function displayEmojee(searchQuery = ""){
    let filteredList = emojiList.filter(function(emoji){
        if(searchQuery.length === 0){
            return true;
        }
        if(emoji.description.indexOf(searchQuery)!== -1){
            return true;
        }
    });

    emoji_container.innerHTML = "";
    filteredList.forEach(function(emoji){
        let new_row = document.createElement("tr");
        let new_emoji = document.createElement("td");
        let new_aliases = document.createElement("td");
        let new_description = document.createElement("td");

        new_description.innerText = emoji.description;
        new_emoji.innerText = emoji.emoji;
        new_aliases.innerText = emoji.aliases.join(", ");

        // Event listener to enlarge and copy emoji
        new_emoji.addEventListener("click", function(){
            enlargeAndCopyEmoji(emoji.emoji);
        });

        new_row.appendChild(new_emoji);
        new_row.appendChild(new_description);
        new_row.appendChild(new_aliases);

        emoji_container.appendChild(new_row);
    });
}

function enlargeAndCopyEmoji(emoji) {
    enlarged_emoji.innerText = emoji;
    enlarged_emoji.style.display = "block";

    // Copy emoji to clipboard
    navigator.clipboard.writeText(emoji).then(() => {
        alert(`Emoji ${emoji} copied to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy emoji: ', err);
    });

    // Hide enlarged emoji after 2 seconds
    setTimeout(() => {
        enlarged_emoji.style.display = "none";
    }, 2000);
}

window.addEventListener("load", () => displayEmojee());

search_field.addEventListener("keyup", (e) => {
    let value = e.target.value;
    displayEmojee(value);
});