/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/gif;base64,R0lGODlhsAQgA+ZAAOjq6Ojm6KakpsvJy6aopp+gn+Hf4a2rrby6vNnY2eHj4bWztcPCwwQCBNLQ0svNy9nb2Z+dn7W2tdLU0q2vrcPFw7y+vHp4enJ0cnJwcpeZl4iKiAsJC5COkCEfITAuMJCSkIiHiIF/gRoYGnp7ehIREhocGpeVlyEjIQQGBDAyMIGDgSkqKWtta1xeXGRiZDc1NyknKWtpaxIUEjc5N0ZERj89P1xaXFVTVU1MTU1PTWRlZAsNCz9BP1VXVUZIRv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBAACwAAAAAsAQgAwAH/4AAgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3cP/jyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDix9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHbo4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBEFmnkkUgmqeT/kkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2zx/8UYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fTTUEct9dRUV2311VhnrfXWXHft9ddghy322GSXbfbZaKet9tpst+3223DHLffcdNdt991456333nz37fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556CHLvropJdu+umop6766qy37vrrsMcu++y012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/334Icv/v/45Jdv/vnop6/++uy37/778Mcv//z012///fjnr//+/Pfv//8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygBCdIwQpa8IIYzKAGN8jBDnrwgyAMoQhHSMISmvCEKEyhClfIwha68IUwjKEMZ0jDGtrwhjjMoQ53yEPyBKCHQPxSABwAggEE0S0uaIALAPDDI44FAggoRAo40ABCOGABDHBiVwzwghwcgImCmGIKBmGABQiAAFrkigFKYIIPJEABYaSiIALAgAgIgAJp5IoNUGCCFgxiilVk4gIIQIEJ5HErC/CACTwQxQA0oAEp+KEFCEAACxxSKz98AQpKYIMAOPL/kUMsAAUWkAAyTiABBrhkUwaggQgwAAKCcMAHRsADDShgBxjAAAAmYEYHCMIADpDAAQrgS1UqRQEb8IAHdhCBUgJABDPQQQQMoYAKCGICCDBjBAhQylQaEykL+EEbVZABASjAASvIYiIGIIACEOAACHBmE79ZlB9G4AUfiAEKYHCBRkhAAAJYwAMMSU+mOEADPkBBDJbICANIYADOLKhSAqCAHzIAAzpA5SJ+CEuJSqUCBphnIn44gJKadAAd9WhQEoCAbErAAgxAgEgR8cMAEACg7bxpFFUalAisAAMyuEAGZJCBRtSUkmcEKAEkwNOgbOACQG1BLv24UTCWtAID/8AqSpsKlARYQAILWMAoF8CIeXqTq0QJwFnJOFNEJOChcBxEW9HqkwQ8QAIPmCsh6OhOBEBUr3TdiV0HKQAGAHYQAyAsBQYwgcMGdiaeDAA2h3lGB9T0EAYwIgCCmdMFFPOxPEmAGQsAz2IOYKaSFeYDfvkABBSgAJoF7U7YGdAHxDUBAkBAYxmQVQAk4J0HOGtmH7BW2drkhwZ4AEqbaAAKUBICNr2pIBZAWks61rg8QcAZG5lUQUDgjAeIKHaHAoF3EsABFe0uEy1wgAjsdLxDQQABCmBdALxTAGQ8gHTBCF+gHOCOIf2hfvE7R15akr/99QkDJPDGOf73APO8bv+CcaKAkBKCARRQp1wnnJQA2JbDHQaxiEdM4hKb+MQoTrGKV8ziFrv4xTCOsYxnTOMa2/jGOM6xjnfM4x77+MdADrKQh0zkIhv5yEhOspKXzOQmO/nJUI6ylKdM5Spb+cpYzrKWt8zlLnv5y2AOs5jHTOYym/nMaE6zmtfM5ja7+c1wjrOc50znOtv5znjOs573zOc++/nPgA60oAdN6EIb+tCITrSiF83oRjv60ZCOtKQnTelKW/rSmM60pjfN6U57+tOgDrWoR03qUpv61KhOtapXzepWu/rVsI61rGdN61rb+ta4zrWud83rXvv618AOtrCHTexiG/vYyE62spf/zexmO/vZ0I62tKdN7Wpb+9rYzra2t83tbnv72+AOt7jHTe5ym/vc6E63utfN7na7+93wjre8503vetv73vjOt773ze9++/vfAA+4wAdO8IIb/OAIT7jCF87whjv84RCPuMQnTvGKW/ziGM+4xjfO8Y57/OMgD7nIR07ykpv85ChPucpXzvKWu/zlMI+5zGdO85rb/OY4z7nOd87znvv850APutCHTvSiG/3oSE+60pfO9KY7/elQj7rUp071qlv96ljPuta3zvWue/3rYA+72MdO9rKb/exoT7va1872trv97XCPu9znTve62/3ueM+73vfO9777/e+AD7zgB0/4L8Ib/vCIT7ziF8/4xjv+8ZCPvOQnT/nKW/7ymM+85jfP+c57/vOgD73oR0/6swQCACH5BAUKAEAALEgCfQEeACIAAAf/gECCg4SFgwCGiYqLggFACoyRQAmEjpKRIkAAlg8OlwYDhSYjM5COJzU6kgk7LgsBiECjHo4BAyUNDZGOJiw0moIeIyaWN7k9jJY5LB8Xg6MzQAEOKSklC4oBlkAINB82A7AjJR4ABj3HiduCiBcfLDeQHCUpQCG5JRWKBggWDrFAbHwwEQHABRIkgICg0aCFIgALduwAgcCAoA0oXBAwVAEDhEmJHHTIQFJDhQAJOnjStk6ShQIZWmS4EOGSoAKFtElbsGHmikeXHhgCQBTIBAIhJgBsaZOQAwUAmwoyUGFAhQcDOkk1JIGAAA0HChQQsLUQgrARIoytudWq1QATQQZYreqp7CGmCSzabURoAIVQey19BEIW6F4gdQc9iHoYiITGhDZCHgTBgb7JmG0ekAwMM4PMBAgcyEy6EoSlTQMBACH5BAUKAEAALEgCfwEhACAAAAf/gECCg4SDAAYCEIWLjI2EKyaCAQABjo4BCg6FNh4fAEAKQAU4LpaFChodCZ+CKjCeQAAJKCUlpoQBMi0dAZVArx+CABkzJTi3sQoBGyIYEYMq0YIPI9UIpgCsQAMXJBmrQB/iQAE/MyPHjtqSQAQYFxvZJh4eABEcHiwPvgMbFwy+QA1woEiQAREXZCwAIkLEhnY1GAoa0AFGgwYYCA3QEIGCJkEUWmhggAvINSAJBNi42IAHAXKCJlCIICDCggRAEFkKoCPFxRQ1NOQUBmQCAgEFChBYENDRh4sqVjyASS5bTAoEBByIZckABRQvFlIdFDABArHYgDxDNsgA20IVXBoNmPYWiABRdu9KEHS3bqG+SO06KuA3LhDDwj5u88vYQNNbbhmtAyJhKlsBe0ER+vR4rCUKjVhNELTWs6WTZBshsMy2oKO+jDWGavtgbuzbuHPr3s27d+/JyAIBACH5BAUKAEAALEoCeAEfAB8AAAf/gECCg4IBQIaGhIqLjI2Oj4yIh5CUiomVlYiXmI+Jm5yQn4SinAkWmwCghYQHLxGDqQMJlakGg4YXGSQBCqkELhiZDAuKFxgkgw40MR6VBgIFBECpQMfIgiIfKrQACwcRFZMXIhmDNh81nA4CBAS2QBckF9MuIx8yjQqKqQwUFAi2WmR4AURDDBUwpg3qQGKAogmEKEALd4ACgQARXphYIShBgXRArgkqsOBBIgYCKBi4BAHIgxABIBzAMWJGCRMSFB4AUmCQAQAWWgLRt09jiZs4YBESoBSSjaM0NgiiRk0Q05yhLNjYgaCSUEeJiFWCSGpfgAto44noEE7VLQANO+LKbUDD7SFqc+XWVfSKkzEMxkhscGh3ENHCjRCYRMwoAkkGEAKUBUWgQDRBhwf1tCuAqULGgyR4FhQIACH5BAUKAEAALFICfAEWACEAAAf/gECCAIKFhoeIiYqKhIuOggEMCo+KEiIFlIeEJysnAI0DJwKUHRshhQYYGBmkIBuFBBcXr4uEICCnAA6yGA6kHSdAARsrIiCMgpOmK0AIOxgiBpNADhonvoUDAQgSCwAVHS0LhQI+IyO0ghONwkAJAgABQC0qKiwshgaQiRgwMTE0LgRrRzBRDhQscERIYEieIwY9LjDIVKgRBYqHHIbYuGJFCBAPKMXjwaEkhxQjcFAKAIADyZMcRuSgyLHjig4ha7WbgLEgAhsuEEBimQlGgwYwMDwAMO1RABwpjnKg0YEdpRM9ojbgQIASAQfyBqyocbSDQ4wDRKzI+YjARERnExcd6GkIAYECEuga6qpX0NtDgQAAIfkEBQoAQAAsSgJ4AR4AKAAAB/+AQIKDggBAhoaEiouMgwFAj42SjYiTlowBiZebmpuehZ+ekYqdoYMTo6aggwwCDIeCCgmpoQQCAoQOBQueCIq3BYQnISCXCkC4x4IEtoMIGyEHngUEr8sHuEAPERsdE5/Yg7cHCgARHRvBykDH64wSjwURGkADIt0JiQYSB5m0jAMqDAAygUAxQQYsdMggw8KmUYkYHLMgIAMGiw48HaNVIMQFhh14ZVIFaSGGDRKU/fMEAEKIAg9INhpoKUACWDUBnACxc2eEb0AyVsj4yQMKD0hRsHgB5MQtIME+HUUxdamgYAWyXQIQYCcIniAiOIgJpALZSZEM3eQkyVCkHjKIrOFctHYSgB4cOPwIAQFSIwlbZXjgwAPFjROSMq4EguCCASAEbpgoMcODNEUSiDbqAKMBBkMPOuSYkWKDu0nWQDRoMMKXIAYaQNCcBklFgxQ+gDwmVGoTAw4pePCSybvFahWLLxEQFEAWj9U3e6sqUMNHdJLLmQOBQDY5JiAHXA+S/olB302BAAAh+QQFCgBAACxSAn4BFgAjAAAH/4BAgoOEgwCFiImKi4gABgqMhASEBgsIkYOTggoHBQKYggSHQAwFBZeggwkEAgQJqaJAEqwMQKNAAbaJBQEMEQUHBgaCAQMWgreFEBICtUAKAxIFEQ+5i8XCEwjApsOJyUAWB78ECAOpAAsRAhQD1qmVCBCphd70yIISEgv8EgyvjEZlGNhi4IUTAQMACEAwQwsMF0Ck2rePn4V5oJzdE+RAB4Zz9CDhiIHChQaAg94lwsAiBgsYjRIxEIFLgIsPMVxKMFQIQIEcHGgCcaDBBYoSIHIRYOAAQIYdGIBE4GDiw4NBIAkVeNWga64fPGa8CACJUQqvQCqUKGGCUYKFXTcbDMJQIoWiCPjOyl0IwUQJRRRsHeLQ1RAFHJgAzGhgwhu4Qu8A4GhwA5flVAw0ZI20MJG9RYEAACH5BAUKAEAALE8ChQEZABwAAAf/gECCg4MCgguCFoSLjI0RjZCNCUAFkZaECg8Ql5ABnJ+goUCbQJOihJ6njABAA66vAwqhAQACBbe4CKAAtAK2vgUCuqC0rxUDxwanD6qDrBAhEaa8qZysIRcZGxSesqIEFxgYFyCIghKCrEAB1UAOHQoAFSc7MhcXzAgTpRnojDcjNggKgGBDix3+BO1oAKMDkHEiBKH4YCOBpwAOLDCweG5EgwYbAHDgAISVCxYoMpT0hirHRx0GAJjwMIPVgw80bChKVQ3BjAY8dAHwYGLEIBEwWOTgxYhGCg4ugBgIQHSGIAUJYrCIoYzRxxHMBI0oSujADQykFt3QIUAdEA8lGliwWyeoq1tBAyzcVRm1q6p9D9pd8nTXGadAACH5BAUKAEAALEgCkAEgABAAAAf/gECCg4SFhkAAh4YDD0CNAYqIhBCRhgdAkJCHkAYLCAaCAQCJhRYvJgikipALAgULFaCqggkiKg0NMZizhhYHBQUCEg6EABo1uA0cPqSamkAQCwAGCQsaEQQCCaEFJbgcNCAGABcDhgggMguCAA4HGhoDCpghuDUgFYIdQDUFQCErVgBZ0OICBk3UIEwYl2gAiQ0SSD2IYYKDACAfPIwQdCKDiAiJeCkC8GLGxnkfPrAQ5ACDiBaNEomqBAQFhxESMKlQ8WHQAhItBCp4FqmGyRdAFCjguRKRARIZMAAxQFTRiBEsJgxK2XPQABACQNEkRKDQBxqSSImsxMBQCRkBC+ISqjq2UAF5dQMBACH5BAUKAEAALEgCiAEgABgAAAf/gEBAJ4KFhoeIiYYUhRKKj5CRkpOUlZAAlooAAQGZiBYdIiQXJCEimJ6GMA2srQ2ph6uurLCGCB0YoqQrtYaoi0CYv6mdQAMZHwO9hZghNSkzNgDDmZgCLyg8IyMuzAqHCg7fQBICBREEBoIABCYcPB45BBABIglAnIUOCCcWiwUFmHUAkiJHhAeCQox4QQCIgAULjBU4cACCugAGHCjTF6IDAkMqWKAQ1CJDBiAQFjz8iKhYogwqaNxQh+HCBUEJ0B0YFyzSAxgfbPgDcgEDiUIDDkwMRi3RjRgfbmK0eVSQAnMRAkyT5AEFjHuCMNQ0lIACAgiVchTqREJEiF8KFNRZGlpIgIsD07augxUgwVmXkAIBACH5BAUKAEAALEgChQEYABwAAAf0gECCg0AJhIeIiQEBFomOQAwhGwMBggoHj4ghDQ01Kw6ZigcmnA05JxBAFaGClRs0pSU3QJUArIISK7ANLEC2t79ABzoqCAq0t4nHyYkkzEAqz9LMGxfOQBjTiQvTvw4XNg/TASA6JSg1yMwyKjEqMNdACr+ViQgqHigwMgUGEAypAARLVGCECRcHDAhacAGEIQYDBggScGgCkAirBA0QQULGqggFIjA7IELEBloFCBA4tDJRAhIZMFgEQkAAJkEVKFBMtAEDCQ1ADAQQIKAlqwwkNhyrpKFoMpIMBNk6YJNQgIGEBB5yIKBCPWkAAoB69jVTIAAh+QQFCgBAACxIAoEBHwAfAAAH/4BAgkABggMMhAGFg4yNjoMGgj81B46VjAIEj4wBAAYNDTMOi48Cm48BKikNLYwElxBArxOnjhwlHBKCl4O8tYwAOKs1CkARmoIFBYLFgg8MzUAbHRWDFSWrHQAOAw+DpoMPCIIOgxxAOiGDGA0sINGb4OBAFChAty4FABMriIRAABr5M2Wh2qAOPTjcQvEC4C9Bmrw5QgDiRwkgMEj9shDrFAIXPSQEDPiw5D+TEhk5KHCiQwcQGkBofEhAgE2bL1h4iBGDhQoPJjEV0ETgxQcPSHcCFTTz0QNvAypAjRBig9UNGhw2dRSpZLlEvygw6LgpAFWytXSZGsCp14kWGIouaNyKaN6gQgxAZJCBAcMypjQFFLikgEGGF301MAiQoAI8RooX0bKL4EULxRAKVYhA4fGmWCkNEGDgTRGEBQIiTFBQQPAgAhIsBAWC4ACBAoVM8Vrm65eB1gK6ymI0oBIFkwdss33tC5nJ2wtIAvnbaEFQBhG+ClpA4DhT6bMZJSCwPPypgAlKBgIAOw=="
            // placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.on(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .one("load", function() {
                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.on(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.on("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.on("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
