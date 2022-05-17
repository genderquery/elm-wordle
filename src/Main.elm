module Main exposing (main)

import Browser
import Browser.Events
import Game
import Html exposing (Html, a, button, div, input, text)
import Html.Attributes exposing (class, classList, href)
import Html.Attributes.Extra
import Html.Events exposing (onClick)
import Json.Decode as Decode
import Json.Encode exposing (string)
import Random
import Util exposing (replaceAt)
import Words



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
    , position : Int
    }


type Model
    = Loading
    | Guessing Data
    | Won Data
    | Lost Data


init : flags -> ( Model, Cmd Msg )
init _ =
    ( Loading, newGame )



-- UPDATE


type Msg
    = KeyPressed String
    | NewWord (Maybe String)
    | NewGame
    | SetPosition Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( model, msg ) of
        ( _, NewGame ) ->
            ( model, newGame )

        ( _, NewWord (Just word) ) ->
            ( Guessing
                { goal = word
                , input = String.repeat wordLength " "
                , guesses = []
                , message = ""
                , position = 0
                }
            , Cmd.none
            )

        ( Guessing ({ input, position } as data), KeyPressed "Backspace" ) ->
            ( Guessing
                { data
                    | input = replaceAt position ' ' input
                    , position = max 0 (position - 1)
                    , message = ""
                }
            , Cmd.none
            )

        ( Guessing ({ input, guesses, goal } as data), KeyPressed "Enter" ) ->
            let
                addGuess =
                    { data
                        | input = String.repeat wordLength " "
                        , guesses = guesses ++ [ input ]
                        , position = 0
                        , message = ""
                    }
            in
            if String.length input < wordLength then
                ( Guessing { data | message = "That word is not long enough." }, Cmd.none )

            else if not (Words.isValid input) then
                ( Guessing { data | message = "That is not a valid word." }, Cmd.none )

            else if input == goal then
                ( Won addGuess, Cmd.none )

            else if List.length guesses >= allowedGuesses - 1 then
                ( Lost addGuess, Cmd.none )

            else
                ( Guessing addGuess, Cmd.none )

        ( Guessing ({ input, position } as data), KeyPressed key ) ->
            case keyMaybeAlpha key of
                Just char ->
                    ( Guessing
                        { data
                            | input = replaceAt position char input
                            , position = min (wordLength - 1) (position + 1)
                            , message = ""
                        }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        ( Won _, KeyPressed "Enter" ) ->
            ( model, newGame )

        ( Lost _, KeyPressed "Enter" ) ->
            ( model, newGame )

        ( Guessing data, SetPosition newPosition ) ->
            ( Guessing { data | position = newPosition }, Cmd.none )

        _ ->
            ( model, Cmd.none )


keyMaybeAlpha : String -> Maybe Char
keyMaybeAlpha key =
    case String.uncons key of
        Just ( char, "" ) ->
            if Char.isAlpha char then
                Just char

            else
                Nothing

        _ ->
            Nothing


newGame : Cmd Msg
newGame =
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
                [ board data
                , div [ class "message" ] [ text message ]
                , keyboard data
                ]

        Won data ->
            div [ class "container" ]
                [ board data
                , gameOver "You Won!"
                , keyboard data
                ]

        Lost ({ goal } as data) ->
            div [ class "container" ]
                [ board data
                , gameOver ("The word was " ++ goal ++ ".")
                , keyboard data
                ]


gameOver : String -> Html Msg
gameOver message =
    div [ class "message" ]
        [ text (message ++ " Press ENTER to start a new game.") ]


classNameForStatus : Game.Status -> String
classNameForStatus status =
    case status of
        Game.Correct ->
            "board__tile--correct"

        Game.Present ->
            "board__tile--present"

        Game.Absent ->
            "board__tile--absent"


board : Data -> Html Msg
board { goal, input, guesses, position } =
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
                (List.indexedMap inputTile (String.toList input))

        inputTile index char =
            div
                [ class "board__tile board__tile--input"
                , classList
                    [ ( "board__tile board__tile--cursor", index == position )
                    ]
                , onClick (SetPosition index)
                ]
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
