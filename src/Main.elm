module Main exposing (main)

import Browser
import Browser.Events
import Game
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (class, classList)
import Html.Attributes.Extra
import Html.Events exposing (onClick)
import Html.Extra
import Json.Decode as Decode
import List.Extra
import Random
import Words exposing (random)



-- constants


allowedGuesses =
    6


wordLength =
    5



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Data =
    { goal : String
    , input : String
    , guesses : List String
    , message : String
    }


type Model
    = Loading
    | Guessing Data
    | Won Data
    | Lost Data


init : flags -> ( Model, Cmd Msg )
init _ =
    ( Loading, newWord )



-- UPDATE


type Msg
    = KeyPressed String
    | NewWord (Maybe String)
    | NewGame


newGame : String -> ( Model, Cmd Msg )
newGame goal =
    ( Guessing
        { goal = goal
        , input = ""
        , guesses = []
        , message = ""
        }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( model, msg ) of
        ( _, NewGame ) ->
            ( model, newWord )

        ( _, NewWord (Just word) ) ->
            newGame word

        ( Guessing ({ input } as data), KeyPressed "Backspace" ) ->
            ( Guessing
                { data
                    | input = String.dropRight 1 input
                    , message = ""
                }
            , Cmd.none
            )

        ( Guessing ({ input, guesses, goal } as data), KeyPressed "Enter" ) ->
            let
                addGuess =
                    { data
                        | input = ""
                        , guesses = guesses ++ [ input ]
                        , message = ""
                    }
            in
            if String.length input < wordLength then
                -- TODO show error message
                ( Guessing { data | message = "Not long enough" }, Cmd.none )

            else if not (Words.isValid input) then
                -- TODO show error message
                ( Guessing { data | message = "Not a valid word" }, Cmd.none )

            else if input == goal then
                ( Won addGuess, Cmd.none )

            else if List.length guesses >= allowedGuesses - 1 then
                ( Lost addGuess, Cmd.none )

            else
                ( Guessing addGuess, Cmd.none )

        ( Guessing ({ input } as data), KeyPressed key ) ->
            if isKeyALetter key && String.length input < wordLength then
                ( Guessing
                    { data
                        | input = input ++ key
                        , message = ""
                    }
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )


isKeyALetter : String -> Bool
isKeyALetter key =
    case String.uncons key of
        Just ( char, "" ) ->
            Char.isAlpha char

        _ ->
            False


newWord : Cmd Msg
newWord =
    Random.generate NewWord Words.random



-- SUBSCRIPTIONS


decodeKey : Decode.Decoder String
decodeKey =
    Decode.field "key" Decode.string


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onKeyDown (Decode.map KeyPressed decodeKey)



-- VIEW


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            text "Loading..."

        Guessing ({ message } as data) ->
            div [ class "container" ]
                [ div [] [ text message ]
                , board data
                , keyboard data
                ]

        Won ({ goal } as data) ->
            div [ class "container" ]
                [ gameOver "You Won!"
                , board data
                , keyboard data
                ]

        Lost ({ goal } as data) ->
            div [ class "container" ]
                [ gameOver "You Lost!"
                , board data
                , keyboard data
                ]


gameOver : String -> Html Msg
gameOver message =
    div []
        [ div [] [ text message ]
        , div []
            [ button [ class "keyboard__key", onClick NewGame ]
                [ text "Play again" ]
            ]
        ]


classNameForStatus status =
    case status of
        Game.Correct ->
            "board__tile--correct"

        Game.Present ->
            "board__tile--present"

        Game.Absent ->
            "board__tile--absent"


board : Data -> Html Msg
board { goal, input, guesses } =
    let
        rows =
            if List.length guesses < allowedGuesses then
                -- with input row
                List.map row guesses
                    ++ (inputRow
                            :: List.repeat
                                (allowedGuesses - List.length guesses - 1)
                                emptyRow
                       )

            else
                -- complete board
                List.map row guesses

        row guess =
            div [ class "board__row" ] (List.map tile (Game.evaluate goal guess))

        tile ( status, char ) =
            div
                [ class "board__tile"
                , class (classNameForStatus status)
                ]
                [ text (String.fromChar char) ]

        emptyRow =
            div [ class "board__row" ] (List.repeat wordLength emptyTile)

        emptyTile =
            div [ class "board__tile board__tile--empty" ] []

        inputRow =
            div [ class "board__row" ]
                (List.map inputTile (String.toList input)
                    ++ List.repeat (wordLength - String.length input) (inputTile ' ')
                )

        inputTile char =
            div [ class "board__tile board__tile--input" ]
                [ text (String.fromChar char) ]
    in
    div [ class "board" ] rows


keyboard : Data -> Html Msg
keyboard { goal, guesses } =
    let
        evaluateGuesses : List ( Game.Status, Char )
        evaluateGuesses =
            List.concatMap (\guess -> Game.evaluate goal guess) guesses

        statusesForLetter letter =
            List.filterMap
                (\( status, char ) ->
                    if char == letter then
                        Just status

                    else
                        Nothing
                )
                evaluateGuesses

        statusForLetter : Char -> Maybe Game.Status
        statusForLetter letter =
            if List.any ((==) Game.Correct) (statusesForLetter letter) then
                Just Game.Correct

            else if List.any ((==) Game.Present) (statusesForLetter letter) then
                Just Game.Present

            else if List.any ((==) Game.Absent) (statusesForLetter letter) then
                Just Game.Absent

            else
                Nothing

        row : String -> Html Msg
        row string =
            div [ class "keyboard__row" ]
                (List.map key (String.toList string))

        key : Char -> Html Msg
        key char =
            case char of
                -- Enter key
                '+' ->
                    button
                        [ class "keyboard__key keyboard__key--one-and-a-half "
                        , onClick (KeyPressed "Enter")
                        ]
                        [ text "Enter" ]

                -- Backspace key
                '-' ->
                    button
                        [ class "keyboard__key keyboard__key--one-and-a-half "
                        , onClick (KeyPressed "Backspace")
                        ]
                        -- TODO: svg
                        [ text "⌫" ]

                -- Spacer
                ' ' ->
                    div [ class "keyboard__key keyboard__key--half" ] []

                -- Letter key
                _ ->
                    button
                        [ class "keyboard__key"
                        , case statusForLetter char of
                            Just status ->
                                class (classNameForStatus status)

                            Nothing ->
                                Html.Attributes.Extra.empty
                        , onClick (KeyPressed (String.fromChar char))
                        ]
                        [ text (String.fromChar char) ]
    in
    div [ class "keyboard" ]
        (List.map row
            [ "qwertyuiop"
            , " asdfghjkl "
            , "+zxcvbnm-"
            ]
        )
