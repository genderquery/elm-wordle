module UtilTests exposing (..)

import Expect
import Test exposing (..)
import Util exposing (..)


suite : Test
suite =
    describe "The Util module"
        [ describe "Util.replaceAt"
            [ test "basics0" <|
                \_ -> replaceAt 0 'd' "abc" |> Expect.equal "dbc"
            , test "basics1" <|
                \_ -> replaceAt 1 'd' "abc" |> Expect.equal "adc"
            , test "basics2" <|
                \_ -> replaceAt 2 'd' "abc" |> Expect.equal "abd"
            , test "out of bounds" <|
                \_ -> replaceAt 4 'd' "abc" |> Expect.equal "abc"
            ]
        ]
