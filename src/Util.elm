module Util exposing (replaceAt)


replaceAt : Int -> Char -> String -> String
replaceAt index char string =
    String.toList string
        |> List.indexedMap
            (\sourceIndex ->
                \sourceChar ->
                    if sourceIndex == index then
                        char

                    else
                        sourceChar
            )
        >> String.fromList
