export class CodeSamples {
    private readonly samples: Map<string, string> = new Map<string, string>([
        [
            'ProducerConsumer.Com',
            `COMPONENT { ENTRYPOINT } ProducerConsumer;
    CONSTANT
        N = 3; (* producers *)
        M = 2; (* consumers *)
        K = 1000; (* original: 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = TRUE; (* original: FALSE; *)

    COMPONENT Producer REQUIRES DataAcceptor;
        VARIABLE i: INTEGER;
        ACTIVITY
            FOR i := 1 TO K DO
                DataAcceptor!Element(i)
            END;
            DataAcceptor!Finished
    END Producer;

    COMPONENT Consumer REQUIRES DataSource;
        VARIABLE x: INTEGER;
        ACTIVITY
            WHILE DataSource?Element DO
                DataSource?Element(x);
                IF Output AND (x MOD (K DIV 10) = 0) THEN WRITE(x); WRITELINE END
            END;
            DataSource?Finished
    END Consumer;

    INTERFACE DataAcceptor;
        { IN Element(x: INTEGER) } IN Finished
    END DataAcceptor;

    INTERFACE DataSource;
        { OUT Element(x: INTEGER) } OUT Finished
    END DataSource;

    COMPONENT BoundedBuffer OFFERS DataAcceptor, DataSource;
        VARIABLE
            a[position: INTEGER]: INTEGER {ARRAY};
            first, last: INTEGER;
            nofProducers: INTEGER;

        IMPLEMENTATION DataAcceptor;
            BEGIN
                WHILE ?Element DO {EXCLUSIVE}
                    AWAIT(last-first < C);
                    ?Element(a[last MOD C]); INC(last)
                END;
                ?Finished;
                BEGIN {EXCLUSIVE} DEC(nofProducers) END
        END DataAcceptor;

        IMPLEMENTATION DataSource;
            VARIABLE stop: BOOLEAN;
            BEGIN
                stop := FALSE;
                REPEAT {EXCLUSIVE}
                    AWAIT((first < last) OR (nofProducers = 0));
                    IF first < last THEN
                        !Element(a[first MOD C]); INC(first)
                    ELSE stop := TRUE
                    END
                UNTIL stop;
                !Finished
        END DataSource;

        BEGIN
            first := 0; last := 0; nofProducers := N
    END BoundedBuffer;

    VARIABLE
        buffer: BoundedBuffer;
        producer[number: INTEGER]: Producer;
        consumer[number: INTEGER]: Consumer;
        i: INTEGER;
    BEGIN
        WRITE(N); WRITE(" producers "); WRITE(M); WRITE(" consumers"); WRITELINE;
        NEW(buffer);
        FOR i := 1 TO N DO
            NEW(producer[i]); CONNECT(DataAcceptor(producer[i]), buffer)
        END;
        FOR i := 1 TO M DO
            NEW(consumer[i]); CONNECT(DataSource(consumer[i]), buffer)
        END;
        FOR i := 1 TO M DO DELETE(consumer[i]) END;
        WRITE("Done"); WRITELINE
END ProducerConsumer;`,
        ],
        [
            'ComponentHelloWorld.Com',
            `INTERFACE HelloWorld;
  { IN Hello(hello: TEXT) OUT World(world: TEXT) } IN Done
END HelloWorld;

COMPONENT CompHelloWorld OFFERS HelloWorld;
  CONSTANT world = "World"; 
  VARIABLE input: TEXT;
  IMPLEMENTATION HelloWorld;
    BEGIN
      WRITE("Waiting for input\\n");
      WHILE ?Hello DO
        ?Hello(input);
        WRITE("Server Received\\n");
        WRITE(input); WRITELINE;
        WRITE("Server Sending\\n");
        !World(world)
      END
  END HelloWorld;
  BEGIN
    WRITE("Hello World Starting\\n")
  FINALLY
    WRITE("Goodbye Hello World\\n")
END CompHelloWorld;

COMPONENT CompSender REQUIRES HelloWorld;
  VARIABLE world: TEXT; i: INTEGER;
  ACTIVITY
    WRITE("Starting Sender\\n");
    FOR i := 1 TO 10 DO
      WRITE("Client Sending\\n");
      HelloWorld!Hello("Hello");
      WRITE("Client Receiving\\n");
      HelloWorld?World(world);
      WRITE(world); WRITELINE
    END;
    HelloWorld!Done
END CompSender;

COMPONENT { ENTRYPOINT } Connector;
  VARIABLE helloWorld: CompHelloWorld; sender: CompSender;
  BEGIN
    WRITE("STARTING CONNECTOR\\n");
    NEW(helloWorld);
    NEW(sender);
    CONNECT(HelloWorld(helloWorld), sender);
    DELETE(helloWorld);
    DELETE(sender)
END Connector;`,
        ],
        [
            'IncLoopCounter.Com',
            `COMPONENT { ENTRYPOINT } IncLoopCounter;
  VARIABLE
    i: INTEGER;
    j: INTEGER;
    max: INTEGER;
  BEGIN
    i := 1;
    j := 1;
    max := 1000;
    WHILE (i < max) DO
      WRITE(i);
      INC(i, j);
      INC(j);
      WRITELINE
    END
END IncLoopCounter;`,
        ],
        [
            `ForeachLooper.Com`,
            `COMPONENT { ENTRYPOINT } Looper;
  VARIABLE
    room[number: INTEGER]: INTEGER;
    i: INTEGER;
  CONSTANT
    limit = 10;
  BEGIN
    FOR i := 1 TO limit DO
      room[i] := i * 10
    END;
    FOREACH i OF room DO
      WRITE(i); WRITE(" ");
      WRITE(room[i]); WRITELINE
    END
END Looper;`,
        ],
        [
            `AdvancedCollection.Com`,
            `COMPONENT { ENTRYPOINT } AdvancedCollection;
  VARIABLE
    room[number: INTEGER; x1: TEXT; x2: BOOLEAN]: INTEGER;
    i: INTEGER; t: TEXT; b: BOOLEAN;
  CONSTANT
     limit = 10;
  BEGIN
    FOR i := 1 TO limit DO
      room[i, TEXT("T"), TRUE] := i * 10
    END;
    room[3, TEXT("T"), FALSE] := 333;
    room[3, TEXT("A"), FALSE] := 666;
    IF i IS INTEGER THEN
      WRITE("i is an INTEGER"); WRITELINE
    END;
    FOREACH i, t, b OF room DO
      WRITE(i); WRITE(" "); WRITE(t); WRITE(" ");
      IF b THEN
        WRITE("TRUE")
      ELSE
        WRITE("FALSE")
      END;
      WRITE(" ");
      WRITE(room[i, t, b]); WRITELINE
    END
END AdvancedCollection;`,
        ],
        [
            'HelloWorld.Com',
            `COMPONENT { ENTRYPOINT } HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE
END HelloWorld;`,
        ] /* */,
    ]);

    getSamples(): Map<string, string> {
        return this.samples;
    }
}
