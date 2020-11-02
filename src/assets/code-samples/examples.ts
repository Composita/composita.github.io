export class CodeSamples {
    private readonly samples: Map<string, string> = new Map<string, string>([
        [
            'HelloWorld.Com',
            `COMPONENT HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE
END HelloWorld;`,
        ],
        [
            'SkipCounter.Com',
            `COMPONENT SkipCounter;
  VARIABLE
    i: INTEGER;
    j: INTEGER;
    max: INTEGER;
  BEGIN
    i := 1;
    j := 1;
    max := 100000;
    WHILE (i < max) DO
      WRITE(i);
      INC(i, j);
      INC(j);
      WRITELINE
    END
END SkipCounter;`,
        ],
        [
            'ProducerConsumer.Com',
            `COMPONENT ProducerConsumer;
    CONSTANT 
        N = 1; (* producers *)
        M = 1; (* consumers *)
        K = 1000000; (* amount per producer *)
        C = 10; (* buffer capacity *)
        Output = FALSE;
    
    COMPONENT Producer REQUIRES DataAcceptor;
        VARIABLE i: INTEGER;
        BEGIN
            FOR i := 1 TO K DO
                DataAcceptor!Element(i)
            END;
            DataAcceptor!Finished
    END Producer;
    
    COMPONENT Consumer REQUIRES DataSource;
        VARIABLE x: INTEGER;
        BEGIN
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
            NEW(a, C); first := 0; last := 0; nofProducers := N
    END BoundedBuffer;
    
    VARIABLE 
        buffer: BoundedBuffer; 
        producer[number: INTEGER]: Producer; 
        consumer[number: INTEGER]: Consumer; 
        i, start: INTEGER; 
    BEGIN
        WRITE(N); WRITE(" producers "); WRITE(M); WRITE(" consumers"); WRITELINE;
        start := SystemTime();
        NEW(buffer); 
        FOR i := 1 TO N DO 
            NEW(producer[i]); CONNECT(DataAcceptor(producer[i]), buffer)
        END;
        FOR i := 1 TO M DO
            NEW(consumer[i]); CONNECT(DataSource(consumer[i]), buffer)
        END;
        FOR i := 1 TO M DO DELETE(consumer[i]) END;
        WRITE(SystemTime() - start); WRITE("ms"); WRITELINE
END ProducerConsumer;`,
        ],
    ]);

    getSamples(): Map<string, string> {
        //return this.samples;
        return new Map<string, string>([
            ['HelloWorld.Com', this.samples.get('HelloWorld.Com') ?? ''],
            ['SkipCounter.Com', this.samples.get('SkipCounter.Com') ?? ''],
        ]);
    }
}
