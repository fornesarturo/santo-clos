function drawNames(participants, veto) {
    // The final name draw.
    let draw = {}
    // Object where the key represents the giftee and the value
    // array represents who can gift them.
    let possibleGifters = {}
    // Fill possibleGifters.
    for (let participant of participants) {
        // Make a copy of participants.
        let giftees = participants.slice()
        // Remove oneself.
        giftees.splice(participants.indexOf(participant), 1)
        // Remove anyone this participant doesn't want to gift.
        for (let v of veto[participant])
            giftees.splice(giftees.indexOf(v), 1)
        // Add oneself to the possible gifters array of
        // each participant one can gift.
        for (let giftee of giftees) {
            if (!possibleGifters[giftee])
                possibleGifters[giftee] = []
            possibleGifters[giftee].push(participant)
        }
    }
    // Number of gifters to look for.
    let size = 1
    // Who has already been given a giftee.
    let chosenToGift = new Set()

    while (chosenToGift.size < participants.length) {
        for (let participant of participants) {
            // Only further execute if this participant's gifters
            // meet the number of gifters we're looking for in this
            // iteration.
            if (possibleGifters[participant].length != size)
                continue
            // Which gifter will be chosen.
            let which = 0
            let gifter = possibleGifters[participant][which]
            // If the gifter has already been picked, select another
            // as long as they haven't been picked either, if there's
            // no possible gifter, then we have an undrawable sceneario.
            while (chosenToGift.has(gifter)) {
                which++
                if (which >= possibleGifters[participant].length)
                    return false
                gifter = possibleGifters[participant][which]
            }
            // Set the gifting relation and mark the gifter as picked.
            draw[gifter] = participant
            chosenToGift.add(gifter)
        }
        size += 1
    }
    return draw
}

module.exports = {
    drawNames: drawNames
}