module Game exposing (Status(..), evaluate)

import List.Extra


type Status
    = Absent
    | Present
    | Correct


evaluate : String -> String -> List ( Status, Char )
evaluate goal guess =
    let
        letterPairs : List ( Char, Char )
        letterPairs =
            List.map2 Tuple.pair (String.toList goal) (String.toList guess)

        lookingFor : List Char
        lookingFor =
            List.filterMap
                (\( expected, actual ) ->
                    if expected /= actual then
                        Just expected

                    else
                        Nothing
                )
                letterPairs
    in
    evaluatePairs letterPairs lookingFor


evaluatePairs : List ( Char, Char ) -> List Char -> List ( Status, Char )
evaluatePairs pairs lookingFor =
    case pairs of
        [] ->
            []

        ( expected, actual ) :: rest ->
            if expected == actual then
                ( Correct, actual ) :: evaluatePairs rest lookingFor

            else if List.member actual lookingFor then
                ( Present, actual ) :: evaluatePairs rest (List.Extra.remove actual lookingFor)

            else
                ( Absent, actual ) :: evaluatePairs rest lookingFor
