executables["chargeHighlight"] = {
    execute(button, layers, args) {
        const otherChargeButtons = layers.flat().filter(x => x.executables.find(e => e.type == "chargeHighlight"));
        console.log(otherChargeButtons)
        for (let otherButton of otherChargeButtons) {
            otherButton.element.classList.remove("highlight")
        }
        button.element.classList.add("highlight")
    },
    async reverse(button, layers, args) {
        //find the current charge position by traversing the action queue backwards
        let highlightableButtons = {};
        for (let layerButton of layers.flat()) {
            if (layerButton.executables.find(e => e.type == "chargeHighlight")) //if its highlightable
                highlightableButtons[layerButton.id] = layerButton //add its id
        }
        let oldHighlightId = [...actionQueue].reverse().find(x=>x && x.id in highlightableButtons).id;
        
        //re add highlights
        button.element.classList.remove("highlight");
        highlightableButtons[oldHighlightId].element.classList.add("highlight");
        

    }
}