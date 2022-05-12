module GameTests exposing (..)

import Expect
import Game exposing (..)
import Test exposing (..)



{--
RUSTY AAAAC
PINEY AACAC
MANLY ACCAC
CANDY CCCAC
CANNY CCCCC
--}


suite : Test
suite =
    describe "The Game module"
        [ describe "Game.evaluate"
            [ test "canny annal" <|
                \_ ->
                    evaluate "canny" "annal"
                        |> Expect.equalLists
                            [ ( Present, 'a' )
                            , ( Present, 'n' )
                            , ( Correct, 'n' )
                            , ( Absent, 'a' )
                            , ( Absent, 'l' )
                            ]
            , test "stone midst" <|
                \_ ->
                    evaluate "stone" "midst"
                        |> Expect.equalLists
                            [ ( Absent, 'm' )
                            , ( Absent, 'i' )
                            , ( Absent, 'd' )
                            , ( Present, 's' )
                            , ( Present, 't' )
                            ]
            , testEvaluate "aaaaa"
                [ ( Absent, 'b' )
                , ( Absent, 'b' )
                , ( Absent, 'b' )
                , ( Absent, 'b' )
                , ( Absent, 'b' )
                ]
            , testEvaluate "bbbbb"
                [ ( Correct, 'b' )
                , ( Correct, 'b' )
                , ( Correct, 'b' )
                , ( Correct, 'b' )
                , ( Correct, 'b' )
                ]
            , testEvaluate "ababa"
                [ ( Present, 'b' )
                , ( Present, 'a' )
                , ( Present, 'b' )
                , ( Present, 'a' )
                , ( Absent, 'b' )
                ]
            , testEvaluate "aaaab"
                [ ( Present, 'b' )
                , ( Correct, 'a' )
                , ( Correct, 'a' )
                , ( Correct, 'a' )
                , ( Present, 'a' )
                ]
            ]
        ]


testEvaluate : String -> List ( Status, Char ) -> Test
testEvaluate goal expected =
    let
        guess : String
        guess =
            String.fromList (List.map (\( _, c ) -> c) expected)
    in
    test (goal ++ " " ++ guess) <|
        \_ -> Expect.equalLists (evaluate goal guess) expected
