PGDMP                         {            Store    14.4    14.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    Store    DATABASE     k   CREATE DATABASE "Store" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "Store";
                postgres    false            ?            1259    24594    products    TABLE     ?  CREATE TABLE public.products (
    "Id" integer NOT NULL,
    "MerchantID" character varying,
    "MerchantProductID" character varying,
    "PrimarySKU" character varying,
    "MerchantSKUID" character varying,
    "SKUName" character varying,
    "SKUNameChi" character varying,
    "WarehouseID" character varying,
    "StockLevel" character varying,
    "OnlineStatus" character varying,
    "Invisible" character varying,
    "ForceOutOfStock" character varying,
    "CreateDate" character varying,
    "OfflineDate" character varying,
    "BrandNameEN" character varying,
    "BrandNameCHI" character varying,
    "Height" character varying,
    "Width" character varying,
    "Depth" character varying,
    "PackingSpecEN" character varying,
    "PackingSpecCHI" character varying,
    "PrimaryCategoryCode" character varying,
    "PrimaryCategoryNameCHI" character varying,
    "Currency" character varying,
    "OriginalPrice" character varying,
    "DiscountPrice" character varying,
    "DiscountRate" character varying,
    "VIPDiscountPrice" character varying,
    "VIPDiscountRate" character varying,
    "GOLDVIPDiscountPrice" character varying,
    "GOLDVIPDiscountRate" character varying,
    status character varying,
    quantity character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            ?            1259    24593    products_Id_seq    SEQUENCE     ?   ALTER TABLE public.products ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."products_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            ?            1259    24586    store    TABLE     ?   CREATE TABLE public.store (
    "Id" integer NOT NULL,
    "storefrontStoreCode" character varying NOT NULL,
    uuid character varying NOT NULL,
    "filePath" character varying NOT NULL
);
    DROP TABLE public.store;
       public         heap    postgres    false            ?            1259    24585    store_Id_seq    SEQUENCE     ?   ALTER TABLE public.store ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."store_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            ?            1259    24578    users    TABLE     ?   CREATE TABLE public.users (
    "Id" integer NOT NULL,
    "Name" character varying NOT NULL,
    "Email" character varying NOT NULL,
    "Password" character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    24577    users_Id_seq    SEQUENCE     ?   ALTER TABLE public.users ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."users_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            ?          0    24594    products 
   TABLE DATA           "  COPY public.products ("Id", "MerchantID", "MerchantProductID", "PrimarySKU", "MerchantSKUID", "SKUName", "SKUNameChi", "WarehouseID", "StockLevel", "OnlineStatus", "Invisible", "ForceOutOfStock", "CreateDate", "OfflineDate", "BrandNameEN", "BrandNameCHI", "Height", "Width", "Depth", "PackingSpecEN", "PackingSpecCHI", "PrimaryCategoryCode", "PrimaryCategoryNameCHI", "Currency", "OriginalPrice", "DiscountPrice", "DiscountRate", "VIPDiscountPrice", "VIPDiscountRate", "GOLDVIPDiscountPrice", "GOLDVIPDiscountRate", status, quantity) FROM stdin;
    public          postgres    false    214   ?       ?          0    24586    store 
   TABLE DATA           N   COPY public.store ("Id", "storefrontStoreCode", uuid, "filePath") FROM stdin;
    public          postgres    false    212   ?;       ?          0    24578    users 
   TABLE DATA           B   COPY public.users ("Id", "Name", "Email", "Password") FROM stdin;
    public          postgres    false    210   i<                  0    0    products_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."products_Id_seq"', 7108, true);
          public          postgres    false    213                       0    0    store_Id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."store_Id_seq"', 5, true);
          public          postgres    false    211                       0    0    users_Id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."users_Id_seq"', 1, true);
          public          postgres    false    209            k           2606    24600    products products_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("Id");
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    214            i           2606    24592    store store_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY ("Id");
 :   ALTER TABLE ONLY public.store DROP CONSTRAINT store_pkey;
       public            postgres    false    212            g           2606    24584    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("Id");
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            ?      x??]?r۸????8?UsfjJ
????EK??X"??ǓMm1c?"?YJJ?[?j[?H?
?MREgZ??r????????????jH?????Meں?
???ϝx?zSkD(%???????}??mI?$^Dqᴨܶ??m???D?*?????L%?@ʾ?Z??PE?4*Im?ߣ??9?o??-?k?d?l?f?ve?h???8??]Iک0???Ӿ?(}???(???d?ۤM>??1y??(??7"??C@?A??LÀh??? ??:	?`?d??5IW??_????o?O;??ٿ?]?5ES}??????߮h+??OmYnWI??[p3? ??M??^?o×?E?,???Ӂ??pRǤ???????r9??<?????EofZ+?????d????L?i?9
S???1?????????j?2?????? nw??a_$?????5?%?Lz??UdY?v???o;
|????r?c?*?Y??֟O?]tt	?tt?????????7t???pJ??;ۙ?<?|???5?'?l???~???7:6t??3??K?g,>?A??w??S???o????ޱH?-m?7?v?Ǔ
]D-?In???QE?&?%?lrǔ?/k+???*?(.????8??;??;??_?nFM???ҥg?H{??l????R??_????vtj??_QYL?۞봅Vؾ?k?????O	?&O?^?B?oOy?l?E???s?H?Qa%]H?J??n?4[T7[???v????G;`???pZa??m??????M???V_EЃ?[I)W???j;)???ְ???H??qnV??)/????8??v0RP>Pԉ???Ͽu???*????&??On????ܓ??Ɠ????<??+0<?&wd?4U??M???C???k>~?鲏/?7(<?ǧ???????<{??x|E???k>>???.udU??H???㫢?W_????R]?9?+??k???N??U??u???????U????{|?}|C??ƫ>>\ n2 ????㛢?7O??٨+?????Q???٨??????Q??q?QWE]?T???F]Eu?׍??_*GY???h,????+J'?|I&i??:K??C??%?my
^?w+|?}r???OB?V|E???Xz??3?dj?y??utSSٌZ????r],6??m?WIr?I?!Mû`?"*K>????;?ߥa?q??I??????V??!Z???e>?ΧO??>???5????_h??S????2?+9To?ûR?"?5?ohC?_?Y?7?+g Av??9??bvҡ??˘?\???PT??????`?@f??o??\$BƘއď?;ܽ}????j???m?G'?????t?f1?H"?c?ʦb2S????????ֽmC?M?xv?XN???b4???{?)_??l>dS?Ď?????PU????]4A?J?
b??+]?To?_l??G??o??????g$?*M?i?U
+??????E??~??y??1?ΛD?Dٔ:9?Lf?@򆸞?\?{?)WG??.-[??xՒ??6???????????
?F6Hސ[{4ro???*oj??W???Zg??B??????{y9?Y#?q?8h???b?ݳQ?\,??/???\7???9?????_V/??4k`֜U??]???L?!S??#??8<?I?^2?6?=???r?&??-V?c?
??Nq????
[m???c?}Ki?f???#??2?ff9?jj&[?T$???n'?x?ɧE0??<???b?ni??҈a??0B?????????Q?,??l*??]??]z?ȝ???lfi???? ?8?????!] #A?e?2??.Y$)???????lw??W?޼?Ye' ~8]KM??$??Ld?Ĵ?ch?.??RxK	FV.?!Ke?03ԯ ?`???y?l?bk3???@?v{A?q?xB??????L?&??QB&A?z?g??h???v|?/????̬??Q??:?`?ڇɨ????_???ڹ???2?z??۹?X\c?	r??k\1??\?uhs??-E??TQ?y??'?MN?????|lyC?\x????????-? i?[
??\]8?ٳ??"VQ?*??*??rV1x?hb?h?n~ݜ??.??t?Dvɭ`f6ؿ?9s&oClc???ˇ5?Wї0mO ?O$?LP??6?kpF??w??0?
N`Ǉkryť?}???ڑ?o?.oSl??(9????]?)????QU??@%?@\??0q??????!Sw?9?c?)鿯}]#n??f???0?u*?\P??hJiY???wqK???k4????OA[??V4?\V??ƾ@r
:?˺?8??}׹?oI????Μ?w{F??;ɪ??m?a??=??޶???rt:??J77???3?*?? U??%??I?*Ab???vW??g?"0i??e???????5A?-?m???O$4?3??XP~A??!G}??[???zo??ۇ?9fj[1D??A?[?D??6???@9?ʆ?%?*???^;?h?G??1&?D?D??b???????.?????=??|???(????h?D+o6?m?'ٚ_?r0??????Ε????**???eZ;???o???g[??{E???L?????/?f?Z?J??$n??c8vm?N?v?????MdI?xM??u??]??t???vo??j???8?p?]g??2?Zv?^ߺ?R?ݎ!`gΏ7?????Mt???n^?@??n^?a??i'F?G???-b?6m???U	N4??K?vbԡ?????yvx1P?K??C3??%?]9y?+ov?򠃟????]??L??N??MD????a???K@ni??c,vy?N?s??zS?#???o_???"?ȴ?r??bxue{???k?c?bٕ?C1E??A<:vϳ.?mT?%0ٯ?m???x?#7?? 
??]???>?S??"v? ?ڎ3??z?~V48?p???o?ŞG?Zk<Sĩ??1;?.l????ldA?V?5b/n??z??FW;T?5n?PLoP?~?z<?o????o???Y??sL?2???kJ 9?A?!?"?Њ?4*F? ?s?ăXg???? ???????7E\r??p????}?n^&m? r?2Z??2[????>??D}??_??T??;?

??L?a?*??????????{I?\a????Ֆ???#?????ଢ??I?)?mu?.Mq?TK?[g?Z?y? ???ԻƞSi??75J??:?"Uq(QK????YW?sa?F0x?ێ?+??N?{N?<?T?E??`?N]H?h??@?]װ?0 4 ?8?????HUI?R$9?X???<B???b??iVw????y6?????m?J??'Uq4q	9?E~????a????{??k:U?,?o-Ҥ)??ŕl??0?!:7Uq?}}?7.??Cg
d??????????????[w5??)?`g1;T??9"????8?J[???rI???ա???hV?Mz?B?x?????PMM??Z϶G?r?0zI0'?4?J???0^?S?\7c???kt??????&N@A|-??j/?.@?pN??c?x???0?^?j?Y?6R<???ģ??q?(K?4?	&K:?ͼ"<????k+A?W???$>#???aE??d?|?Uk???r??r?8???*X_??\L?.????Y/K???Cr??I?????<Z??????S?;????\?????K?????'?#??4q???J?pE&?wH?.?d?	<諷?(? ?Mn???C,]???x???WG=???q?.F ?X$?|?
?1???G?u??m8???ݔ5%??vF6?M?`??#]\?qF]?_?G??t~ԑ???{?kw?6}??秧?&rt1????^????O???[?b2?䡋.? ?F?`Ә???]tqD1R?-?y?.?U??h)???ó &?gtq??-??{????H???v?w?i?*ftq?ӻ?K6ݞ9}?#=,1{??ڵ???*?j???䱌!? ?0???>?[??%ɗp?ObA??Mָa???J?L~8????#?mW?m??N9????!??F?"?ւ&?m?=??iּ??ݛܗ?????#???G    @&)?*[p1y`d??+?K;0??;@??e?~$Vz??'V?:?v?q/??ۻCd??????[X??T?8????(?????C????'?"Hw?????8?|0LU?(*?lFFqE???ރc??? ?}??C߱o?ԟ??/?????F????JT??ֻ??Tq?q0?????P]???bf?????e??E?????e??s??I?=k????q?6F?3??@???S?]???xcJ?J??dЫ$E??:?񫕜?v??r??#ASKLvW???O?X?1???k-??T;KӤ?p???<F4őĔ-P?d?????<?^??.`?Zh?
Y<?E746?vy,i????0?L?(X,!?ϗ??Ի?Ư?<?4?a?T?AY?rF?)????ryC-??gZ??:?:?N???<$J&չ1??HS\?6ٝ??0?!?I?ŜL?u?_?^???ZV?1?G<J????eE&?&<b?	G???????^??[????H???;???7b?J?_t?2??c??KS\0F???dY????" ????b+v]$??r?i2J?;4?0????d ??X???a??n?79?e????????????%d? ??'5?A?Zg??:??I*?6???b??eў?؏???wf8??t????7????Z??,?끶?6>?LO?zQo???4	?T?]???y???.?/?? ?~?!x??͚?Uޅ?U?D?i"?
C?H?+F?]	^Fq? ?A?
?O??pxN?H?QpG?{??#???xU?,?Z&If?!2D???N u?`?˂?a?+?Ɉ???? 2?^v?Ȱ?"??=w?5t\?z??=???.?hZ{??ٔ%N{v?а?B?~??ψ?|?V???ȖD?Q?,@?ǻ??a?j??6#?"7cv?p????	?}?:?I????!?_?®vY@x&8?q???F????#??b??e?_???l7;?~?L@|W?M7{???$!DqY?????ݲ??W???ᡴ? ?3???͎b?;?)????r<g??6~rw?qy/Xy???!QR1??XP?\XD??ݣZ?.?l?}?e?ޖ???HF??.ā(.?????ܮ??皝?D?=?????73?wxi?͝????~?????r8????(?????ݗ? ?{??
Fzi?}q?ŏ?	1? ????l?Ze????~?5?^?ɟ????ʁ<*欣?FQ??6?/k??B?#?J??t/?8?GżtTbA?(Y?~M?ɠ?Ob?#?}??H?L?1?e??c???|t??NN?H s@?JB??b?p?*V?՜(8?Z??cB*Ƅ?Ä^?t??w??????sL????О??b?>JY(P ?K?ϫM`X?A?&??????s!???
???P??G)?8??????a?O՗??T?(??I??3xի?*?03J??PLb?bff`???(???P??????(????硢??cr'??+ {??%?D??D???M??Q?.?H??y?*???~Aږh?4l??a?#E*FI ?x???r?V+?8༊
??x??6ܐ?c8G????Գ?)$yW?i??????????4?Ğ?!8?v'??U????:??~|?𓑪??|i?C??{????ם؟???'˛??m??٥?3'???=?s?u??N?o5f??{A??׀;?u'???̃??n߽?N??ݽ??R??EM??????v?P؝س}\9?%????L?!?e5?z׭&?Ρ? ??J????AZ?!8?R?e?'??ل??v?? w??N<??Io`???'?( w??N<F?=?#???߮l??,l ??F??ؚ?;?
??p*&?Dq?u??E<?jfC??&Y???w_]???;mv'??V??Bz?h?+?*?2?{??-oo(???????hw???X???gl?????˛ڛ3??{??H?V<d3`???*gce?X?O????%ʏ??'ӧb?J?o5)N?ȑ?g?ʻ???M%oN?|	?Z????çbJ3?A?????e?:d|?J6?.F?!??E?g???+??C????N??n*7?x?!???eJ??d?}I?-;????Sx/f>'?v????H?梶???[???b?????q????????֕;?,N??f????5??I;????*bJZf?l??U-<ǳ??a??	Tm?G?:cH<?=?I?x????>?-?4
?T??b?'????(e"??}ea??Pʪ?????N/??????U??驘???9/???;??N??5?JH?F??tU?->?<?T??!????{?u??ޘ???4????0OU1?Q?;?????%?K??ԟ?:?????x??э??+?P?????c%OKO??Te??WӘb??שb5?FOU1?QU?ˣ??/?'??o{????̻??R?T?u???Rq?"???????"????yTi?G?}???I?/ř7? ?R?	?a?l6Sxz*?L?*x?8??,?????4????<?<s??2Wj?O|?/??
W??x?܇??0%????M@10??Ȋ??o<?<??R?5??`?G?m??????T?xJ?S7?2??????e??u-?.??4??^hk ?2	{?%x?y????!,?|??/???s2?9??ܕ???0?N??8????x?y*?y??k~?[?n????h?B??"m^?L-yp????Vg?N0I?a
)?|IF?=<W?>?-8v?@?ήb?0OO?䶔!??LF???y????O"??|?TLb??R??渾???*G???T?r?????˿?ǟ??$??j?????Vw?kuĉ?qQ\ʢ? %?????3?F?pN?3???{خ???Iv??y>???H???<??颸???/?88?????0??:?c?ڊ?XE????T?:?????(.???M?+???wi?½?k<???ޯ?z?~?ݝ?IxQ\??
?9??D????b?B??!7??؎'o?b?]?h?`u?@?a\????|??8Zfǘl???X???S1O/?K????J?_???dE&?t????=	Ey '&?Eq):]?/??R?q?????"???? ȟ3r<WcYsa
x???N_????|Q?g?3???????7?????<?6?????(?Y?H?v??%X?-??b?????˧GV???_?gv????-.v1kT??b???B???y??m???x?{NҊ=??8?Mvl??v?Թ?v????q??g~x"z*f?FqiR???m?|2sF??l??Ǽ?$Gc??/????<I=SH??T
rl2?=?A???S?7??]?'ju?j???<??(?W?????<?K J??=D$h}BJ?i$`^???Z?<???C@15-?Qg?a-?[[͟8???S15?K͝?l?rY?暲??\?T?*??Ҁ????Eg{???.??@C{??b?A?C1?4e????2-?`߁?.?p	g?&?? ?O?O?DҔ!?X?#?_֨X???????̧bh??@Wқ?]=<??|??a?!?qF??OAb7
??u???P?Qܦu???ڪ?2l?"<p3???(7?!?/r?>#V??po_???L????a?!?iF?M????~]$)$???9?rJ]??h??e?????N?E߂E??S?A??.???C11?;?K??ΰC?&?q!?
??YA ?q??^??? <?=s???_)$??EW?W?V?5??j???꩘??%/'??8Y%8??ޗ?W9y?+l?nn??)?Q\^t?\?8?32?(????[?Nw?O? <t????<??rz???o$-k???9?x???؀?vb*w?N???????S?e󔿡4????(?W??}?7t?哞g?}2D???ͭ?l?j????????I멘????x!?a???-Z`??>`?????D???֛*\v??M?/n??Ӳ<?=?????'???)????"C?U??????_?X???2;??S1?;?K?u??Nw???G?S?Ó<I=??XкY1]铻m?&Xj???O?1)?GO???(.?,????1??=?Fe?????????Jyz*?c?;>?6???OO?6???>Y????ڤ7pp2??[??݃?? ?  ?)?w_?w1??a???褷ٸ?????\h?????Fm?[??X??????d3??q?D?o\d'c??!y?	?<???
H~???We֯o?X?8ͽ[/???7:??I-0ζ_?ϙ??y??m)?CD?yЖ???Nr[?t????6??Gm?]???B?l?A?d'z(?.e?VdڕY??0??:???f?y????&?F?x??ː?z??BT?\?]VԶs?v,??M?I???9??Ʋ?kM??nY|E??&?ou??4?????p???&֜K???*i4??? ?GϺ\??{?6+?3?vۭ?ͫ=+??Z?
??<??d<ϔ?&??՘??e????\2??*9??|?&??wH$?rI?`??$ށ?????@?D.-uu?
??ߞ_7&????$?ŕm??d? YQYk?I?]??????7߄C??Y?Bi?????????Td??EU;??U8?`???OP???b?=3Qm???u?o C??v gR?S"????????Z??      ?   ?   x?5ͱ
?0@ѹ???:?$M򚸉??? ??J?I?{?8?pMs?JB?&??"??ĵ???`7!?>*????rB|??<??k.5?uˈW*K??}'!??s??? ?m??}+?8R??????Oy????B????]??a??Z?/?      ?   %   x?3?tL??̃?鹉?9z??????1W? ??     