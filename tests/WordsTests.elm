module WordsTests exposing (..)

import Expect
import Test exposing (..)
import Words


suite : Test
suite =
    describe "The Words module"
        [ describe "Words.isValid"
            [ test "finds valid word in play list" <|
                \_ ->
                    Expect.true "Expected word 'kitty' to be valid." (Words.isValid "kitty")
            , test "finds valid word in valid list" <|
                \_ ->
                    Expect.true "Expected word 'doggy' to be valid." (Words.isValid "doggy")
            , test "does not find invalid word" <|
                \_ ->
                    Expect.false "Expected word 'zzyzx' to be invalid." (Words.isValid "zzyzx")
            ]
        ]
