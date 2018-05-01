async function drawNames(participants, veto = null) {
    function lastResortDrawNames(participants, veto = null, possibleGifters) {
        // The final name draw.
        let draw = {}
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

    function hamiltonianDraw(participants, veto) {
        // Helper function to recurse until the first Hamiltonian Cycle is found.
        function drawRecurse(gifters, lastVisited, path, visited) {
            // Update path and visited to have the last visited node.
            path.push(lastVisited)
            visited.add(lastVisited)
            // Iterate over the participants the last visited participant
            // is able to gift.
            for (let participant of gifters[lastVisited]) {
                // We're done with this route.
                if (path.length == participants.length) {
                    // Cycle reached?
                    if (gifters[lastVisited].indexOf(path[0]) != -1) {
                        path.push(path[0])
                        console.log("Path: ", path)
                        return path
                    }
                    return false
                }
                // If we haven't visited this participant, let's.
                if (!visited.has(participant)) {
                    let pathResult = drawRecurse(gifters, participant, path, visited)
                    if (pathResult) {
                        // If we have a path, return it, else, try with the next
                        // participant.
                        return pathResult
                    }
                }
            }
            // Control when we have visited every participant in the last visited's
            // possible giftees.
            return false
        }

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
            if (veto) {
                for (let v of veto[participant])
                    giftees.splice(giftees.indexOf(v), 1)
            }
            // Add oneself to the possible gifters array of
            // each participant one can gift.
            for (let giftee of giftees) {
                if (!possibleGifters[giftee])
                    possibleGifters[giftee] = []
                possibleGifters[giftee].push(participant)
            }
        }

        for (let origin of participants) {
            let path = drawRecurse(possibleGifters, origin, [], new Set())
            if (path) {
                let draw = {}
                for (let i = 0; i < path.length - 1; i++) {
                    draw[path[i]] = path[i + 1]
                }
                return draw
            }
        }
        return lastResortDrawNames(participants, veto, possibleGifters)
    }

    return await hamiltonianDraw(participants, veto)
}

module.exports = drawNames