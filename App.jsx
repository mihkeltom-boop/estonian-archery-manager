import React, { useState, useRef, useMemo } from 'react';
import { 
  Database, Menu, Upload, Wand2, CheckSquare, 
  FileText, ChevronRight, Plus, Clock, FileSpreadsheet,
  Play, AlertCircle, Check, X, SkipForward, Search, Filter,
  Download, Eye, Trash2, Edit3, Settings, XCircle, FileDown, FileUp,
  ArrowRight, RefreshCw, Lightbulb, Edit, User, TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ALL_COMPETITION_DATA = {
  '01_12_2024_Eesti_sisekarikavoistluse_finaal_2024.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
MARTIN,RIST,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,282
MARTIN,RIST,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,283
MARTIN,RIST,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,565
ALO,NURMSALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,279
ALO,NURMSALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,280
ALO,NURMSALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,559
JAANUS,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,278
JAANUS,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,278
JAANUS,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,556
PRIIT,TANVEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,273
PRIIT,TANVEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,278
PRIIT,TANVEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,551
KAIT,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,265
KAIT,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,277
KAIT,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,542
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,273
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,260
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,533
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,268
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,262
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,530
ARE,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,273
ARE,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,250
ARE,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,523
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,258
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,264
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,522
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,251
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,268
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,519
MARTEN,SUITS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,255
MARTEN,SUITS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,254
MARTEN,SUITS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,509
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,236
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,257
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,493
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,240
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,248
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,488
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,236
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,241
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,477
ROBERT,PIHO,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,194
ROBERT,PIHO,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,18m,148
ROBERT,PIHO,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Mehed,2x18m,342
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,278
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,266
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,544
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,274
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,261
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,535
KRISTEL,MEIER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,265
KRISTEL,MEIER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,263
KRISTEL,MEIER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,528
JAANIKA,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,252
JAANIKA,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,275
JAANIKA,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,527
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,257
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,264
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,521
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,259
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,246
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,505
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,246
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,245
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,491
KADI,KOORT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,233
KADI,KOORT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,254
KADI,KOORT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,487
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,234
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,244
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,478
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,241
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,221
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,462
MARET,TAMME,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,222
MARET,TAMME,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,223
MARET,TAMME,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,445
EVA-MARIA,VINKEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,219
EVA-MARIA,VINKEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,212
EVA-MARIA,VINKEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,431
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,235
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,195
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,430
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,237
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,178
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,415
KARMEL,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,217
KARMEL,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,195
KARMEL,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,412
GRETE,TÕNISMÄE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,158
GRETE,TÕNISMÄE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,18m,195
GRETE,TÕNISMÄE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Naised,2x18m,353
VIKTOR,PALMET,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (70+),18m,170
VIKTOR,PALMET,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (70+),18m,171
VIKTOR,PALMET,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (70+),2x18m,341
RAOUL,JOHANSON,PM Pärnu Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),18m,238
RAOUL,JOHANSON,PM Pärnu Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),18m,239
RAOUL,JOHANSON,PM Pärnu Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),2x18m,477
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),18m,220
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),18m,217
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (60+),2x18m,437
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),18m,233
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),18m,223
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),2x18m,456
HELLE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),18m,202
HELLE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),18m,229
HELLE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Naised (60+),2x18m,431
TANEL,KAASIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,273
TANEL,KAASIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,274
TANEL,KAASIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),2x18m,547
JEVGENI,IKKO,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,267
JEVGENI,IKKO,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,266
JEVGENI,IKKO,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),2x18m,533
ANDRES,SILD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,241
ANDRES,SILD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,254
ANDRES,SILD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),2x18m,495
PRIIT,PRAMANN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,214
PRIIT,PRAMANN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),18m,234
PRIIT,PRAMANN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - Veteranid Mehed (50+),2x18m,448
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,273
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,258
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,2x18m,531
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,248
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,256
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,2x18m,504
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,244
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,250
ERKI,ÜTSMÜTS,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,2x18m,494
RASMUS,KUUSMAA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,249
RASMUS,KUUSMAA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,243
RASMUS,KUUSMAA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,2x18m,492
KARL EIRIK,KOHAVA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,236
KARL EIRIK,KOHAVA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,18m,207
KARL EIRIK,KOHAVA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Noormehed,2x18m,443
ANNE,SEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,268
ANNE,SEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,274
ANNE,SEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,2x18m,542
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,270
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,254
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,2x18m,524
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,259
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,255
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,2x18m,514
EPP MARII,PUKSMANN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,222
EPP MARII,PUKSMANN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,197
EPP MARII,PUKSMANN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,2x18m,419
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,218
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,18m,198
LAURA,SOOTNA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U21 Neiud,2x18m,416
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,292
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,285
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,577
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,290
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,281
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,571
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,281
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,288
KAAREL,PILLART,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,569
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,282
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,286
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,568
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,284
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,281
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,565
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,282
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,280
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,562
KERON,SAULUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,280
KERON,SAULUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,282
KERON,SAULUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,562
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,283
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,276
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,559
KASPAR,GRAUEN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,276
KASPAR,GRAUEN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,274
KASPAR,GRAUEN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,550
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,285
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,263
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,548
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,276
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,268
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,544
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,267
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,269
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,536
MAVERIK,VALEND,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,268
MAVERIK,VALEND,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,264
MAVERIK,VALEND,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,532
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,243
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,255
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,498
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,261
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,18m,195
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Noormehed,2x18m,456
EMILI,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,287
EMILI,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,283
EMILI,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,570
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,283
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,284
INGRID ANNALORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,567
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,281
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,279
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,560
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,275
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,284
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,559
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,274
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,280
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,554
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,269
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,276
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,545
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,277
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,268
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,545
KADRI,TOOMING,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,273
KADRI,TOOMING,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,267
KADRI,TOOMING,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,540
VELEIA,OVSIANYTSKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,260
VELEIA,OVSIANYTSKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,263
VELEIA,OVSIANYTSKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,523
MARTHA MIIA,LIMMER,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,261
MARTHA MIIA,LIMMER,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,259
MARTHA MIIA,LIMMER,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,520
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,266
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,253
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,519
LUISA,KASUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,249
LUISA,KASUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,267
LUISA,KASUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,516
ELIISE,REIM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,243
ELIISE,REIM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,250
ELIISE,REIM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,493
SAIRE,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,240
SAIRE,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,18m,253
SAIRE,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U18 Neiud,2x18m,493
THOR MATTIAS,RAPP,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,291
THOR MATTIAS,RAPP,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,281
THOR MATTIAS,RAPP,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,572
RENE,ALEKSANDROV,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,286
RENE,ALEKSANDROV,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,281
RENE,ALEKSANDROV,SJK Suure-Jaani Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,567
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,283
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,283
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,566
MÄRT,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,279
MÄRT,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,281
MÄRT,GROSS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,560
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,277
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,277
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,554
BRONEK,IBRUS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,249
BRONEK,IBRUS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,236
BRONEK,IBRUS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,485
ERTON,RODIMA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,241
ERTON,RODIMA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,15m,231
ERTON,RODIMA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Poisid,2x15m,472
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,296
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,297
EMMA,KASK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,593
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,291
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,290
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,581
LIISE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,287
LIISE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,289
LIISE,RÄTSEP,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,576
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,283
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,290
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,573
SANDRA,LÕOKE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,282
SANDRA,LÕOKE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,277
SANDRA,LÕOKE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,559
MIRTEL,LILLELEHT,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,284
MIRTEL,LILLELEHT,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,273
MIRTEL,LILLELEHT,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,557
LORETTA,MERESMAA,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,280
LORETTA,MERESMAA,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,258
LORETTA,MERESMAA,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,538
STELLA,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,258
STELLA,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,271
STELLA,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,529
LAURA-LIISE,TAMMISTU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,262
LAURA-LIISE,TAMMISTU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,266
LAURA-LIISE,TAMMISTU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,528
EMILIA,DULUB,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,255
EMILIA,DULUB,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,262
EMILIA,DULUB,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,517
GERDA LIILA,LATTIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,199
GERDA LIILA,LATTIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,15m,243
GERDA LIILA,LATTIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U15 Tüdrukud,2x15m,442
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,289
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,291
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,580
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,289
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,291
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,580
OTTO,MIKKOR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,284
OTTO,MIKKOR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,285
OTTO,MIKKOR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,569
MATTIAS,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,282
MATTIAS,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,270
MATTIAS,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,552
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,260
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,281
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,541
EMIL JOHANNES,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,266
EMIL JOHANNES,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,272
EMIL JOHANNES,VÄLJA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,538
ROMET,JAAKSON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,256
ROMET,JAAKSON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,256
ROMET,JAAKSON,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,512
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,246
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,15m,261
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid,2x15m,507
NIKITA,SAZONOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,256
NIKITA,SAZONOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,244
NIKITA,SAZONOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,2x15m,500
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,262
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,233
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,2x15m,495
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,238
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,249
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,2x15m,487
ERKI,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,200
ERKI,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,15m,206
ERKI,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Poisid Jätka,2x15m,406
KAISA,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,294
KAISA,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,297
KAISA,KRAAV,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,591
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,289
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,284
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,573
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,280
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,288
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,568
KARITA,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,280
KARITA,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,279
KARITA,UUSELU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,559
EKATERINA,NOVIKOVA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,255
EKATERINA,NOVIKOVA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,269
EKATERINA,NOVIKOVA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,524
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,260
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,262
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,522
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,268
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,248
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,516
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,229
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,15m,261
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Sportvibu - U13 Tüdrukud,2x15m,490
ROBIN,JÄÄTMA,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,300
ROBIN,JÄÄTMA,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,297
ROBIN,JÄÄTMA,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,597
KRISTJAN,PUUSEPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,285
KRISTJAN,PUUSEPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,285
KRISTJAN,PUUSEPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,570
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,281
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,286
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,567
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,283
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,284
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,567
VIKTOR,LUTŠKA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,281
VIKTOR,LUTŠKA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,279
VIKTOR,LUTŠKA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,560
KRISTJAN,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,280
KRISTJAN,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,279
KRISTJAN,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,559
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,282
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,276
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,558
REIMO,LOORENTS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,271
REIMO,LOORENTS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,275
REIMO,LOORENTS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,546
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,274
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,18m,264
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Mehed,2x18m,538
KRISTI,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,18m,286
KRISTI,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,18m,285
KRISTI,ILVES,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,2x18m,571
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,18m,272
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,18m,277
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Naised,2x18m,549
JAAN,KOOKLA,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (60+),18m,271
JAAN,KOOKLA,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (60+),18m,255
JAAN,KOOKLA,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (60+),2x18m,526
MART,MARANDI,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),18m,283
MART,MARANDI,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),18m,282
MART,MARANDI,BH Baltic Hunter SC,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),2x18m,565
TARMO,KANAMÄE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),18m,274
TARMO,KANAMÄE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),18m,251
TARMO,KANAMÄE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Mehed (50+),2x18m,525
EVELYN,RANG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Naised (50+),18m,266
EVELYN,RANG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Naised (50+),18m,260
EVELYN,RANG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - Veteranid Naised (50+),2x18m,526
KARL-MATTHIAS,PAU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,18m,270
KARL-MATTHIAS,PAU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,18m,268
KARL-MATTHIAS,PAU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,2x18m,538
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,18m,268
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,18m,266
PAUL,HANNI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Noormehed,2x18m,534
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,281
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,280
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,2x18m,561
MARTA-MARLEEN,ÕUN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,246
MARTA-MARLEEN,ÕUN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,243
MARTA-MARLEEN,ÕUN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,2x18m,489
CARMEL,LONDON,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,211
CARMEL,LONDON,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,18m,201
CARMEL,LONDON,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U21 Neiud,2x18m,412
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,298
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,292
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,590
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,288
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,292
SIIM OLIVER,KALMUS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,580
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,290
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,285
AKSEL,TÄHEPÕLD,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,575
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,289
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,284
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,573
KARL-ERIC,FATAL,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,285
KARL-ERIC,FATAL,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,285
KARL-ERIC,FATAL,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,570
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,243
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,258
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,501
GERT,SOE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,254
GERT,SOE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,241
GERT,SOE,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,495
MARTIN,PALO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,223
MARTIN,PALO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,193
MARTIN,PALO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,416
KARL,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,229
KARL,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,18m,175
KARL,ÕISMAA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Noormehed,2x18m,404
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,283
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,280
AUREELIA,KASAR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,563
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,273
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,278
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,551
EMERI,LEPASAAR,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,261
EMERI,LEPASAAR,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,257
EMERI,LEPASAAR,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,518
ADRIANA,VANAMB,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,251
ADRIANA,VANAMB,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,259
ADRIANA,VANAMB,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,510
MARCELLA,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,231
MARCELLA,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,243
MARCELLA,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,474
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,242
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,18m,217
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U18 Neiud,2x18m,459
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,297
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,296
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,2x15m,593
JARKO,KORMIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,287
JARKO,KORMIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,290
JARKO,KORMIK,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,2x15m,577
WISAM,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,284
WISAM,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,15m,290
WISAM,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Poisid,2x15m,574
SANDRA,MASING,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,295
SANDRA,MASING,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,298
SANDRA,MASING,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,593
MIIA,KERDE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,296
MIIA,KERDE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,293
MIIA,KERDE,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,589
MERIBEL,SARV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,291
MERIBEL,SARV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,297
MERIBEL,SARV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,588
LIISE,KUUSK,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,286
LIISE,KUUSK,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,288
LIISE,KUUSK,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,574
GHALA,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,284
GHALA,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,282
GHALA,ZAABOUT,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,566
BRIANNA,KREIS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,267
BRIANNA,KREIS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,15m,272
BRIANNA,KREIS,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U15 Tüdrukud,2x15m,539
ERON MATRI,MIKKU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,287
ERON MATRI,MIKKU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,287
ERON MATRI,MIKKU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,2x15m,574
KARL MÄRTEN,AREN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,288
KARL MÄRTEN,AREN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,284
KARL MÄRTEN,AREN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,2x15m,572
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,282
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,257
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,2x15m,539
RAIMOND,SCHASMIN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,266
RAIMOND,SCHASMIN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,270
RAIMOND,SCHASMIN,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,2x15m,536
HOLGER,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,223
HOLGER,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,15m,247
HOLGER,PEIPS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Poisid,2x15m,470
LUMILI,LAUR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,297
LUMILI,LAUR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,297
LUMILI,LAUR,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,594
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,293
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,287
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,580
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,291
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,285
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,576
ANGELINA,LIPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,282
ANGELINA,LIPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,289
ANGELINA,LIPP,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,571
TRIINU,LUUKAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,286
TRIINU,LUUKAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,283
TRIINU,LUUKAS,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,569
KAISA,KARU,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,283
KAISA,KARU,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,15m,283
KAISA,KARU,TYRI Türi Vibukool,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Plokkvibu - U13 Tüdrukud,2x15m,566
JAAN,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,238
JAAN,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,240
JAAN,RÖSLER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,478
LAURI,VILIBERG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,230
LAURI,VILIBERG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,231
LAURI,VILIBERG,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,461
PAUL,VILLEMI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,234
PAUL,VILLEMI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,219
PAUL,VILLEMI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,453
PRIIDU,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,223
PRIIDU,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,221
PRIIDU,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,444
VAIDO,VALLI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,220
VAIDO,VALLI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,223
VAIDO,VALLI,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,443
MARTTI,SIITSMAN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,202
MARTTI,SIITSMAN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,174
MARTTI,SIITSMAN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,376
VLADIMIR,MIRANKOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,108
VLADIMIR,MIRANKOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,18m,137
VLADIMIR,MIRANKOV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Mehed,2x18m,245
KRISTA,HEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,237
KRISTA,HEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,260
KRISTA,HEIN,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,2x18m,497
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,237
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,218
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,2x18m,455
TRIIN,KENT,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,220
TRIIN,KENT,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,230
TRIIN,KENT,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,2x18m,450
TERJE,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,225
TERJE,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,210
TERJE,PAOMETS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,2x18m,435
EMMA-MAE,ROODLA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,156
EMMA-MAE,ROODLA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,18m,157
EMMA-MAE,ROODLA,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Naised,2x18m,313
ANDREI,KUKUŠKIN,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Mehed (60+),18m,166
ANDREI,KUKUŠKIN,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Mehed (60+),18m,165
ANDREI,KUKUŠKIN,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Mehed (60+),2x18m,331
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Naised (60+),18m,192
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Naised (60+),18m,195
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - Veteranid Naised (60+),2x18m,387
KAIN,ILVES,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,18m,158
KAIN,ILVES,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,18m,186
KAIN,ILVES,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,2x18m,344
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,18m,141
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,18m,135
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Noormehed,2x18m,276
PIIBE,ZINGEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Neiud,18m,156
PIIBE,ZINGEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Neiud,18m,172
PIIBE,ZINGEL,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U21 Neiud,2x18m,328
DIMITRI,LARIONOV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,264
DIMITRI,LARIONOV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,231
DIMITRI,LARIONOV,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,495
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,241
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,211
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,452
ANDRO,RAUKAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,221
ANDRO,RAUKAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,230
ANDRO,RAUKAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,451
JAN-JAREK,LINNAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,228
JAN-JAREK,LINNAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,220
JAN-JAREK,LINNAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,448
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,217
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,226
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,443
NIKITA,VALASHAS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,222
NIKITA,VALASHAS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,203
NIKITA,VALASHAS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,425
OLIVER ALEKS,TRIPPEL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,200
OLIVER ALEKS,TRIPPEL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,219
OLIVER ALEKS,TRIPPEL,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,419
RASMUS,PERVE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,194
RASMUS,PERVE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,213
RASMUS,PERVE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,407
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,206
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,194
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,400
MARTIN,VIIRPALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,124
MARTIN,VIIRPALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,18m,113
MARTIN,VIIRPALU,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Noormehed,2x18m,237
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,243
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,244
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,487
ALIAKSANDRA,PETRUSHENKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,220
ALIAKSANDRA,PETRUSHENKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,240
ALIAKSANDRA,PETRUSHENKA,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,460
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,240
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,208
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,448
HANNA,ORM,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,225
HANNA,ORM,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,220
HANNA,ORM,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,445
RENATE,TREI,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,229
RENATE,TREI,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,215
RENATE,TREI,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,444
ANDRA,VIRMA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,217
ANDRA,VIRMA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,225
ANDRA,VIRMA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,442
KAJA,KELDER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,211
KAJA,KELDER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,227
KAJA,KELDER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,438
GRETE REBECCA,PAOMETS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,206
GRETE REBECCA,PAOMETS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,195
GRETE REBECCA,PAOMETS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,401
MICHELLE,KVELSTEIN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,173
MICHELLE,KVELSTEIN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,183
MICHELLE,KVELSTEIN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,356
HANNARIIN,TÄHTSALU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,120
HANNARIIN,TÄHTSALU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,161
HANNARIIN,TÄHTSALU,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,281
KARINA,JUURIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,125
KARINA,JUURIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,18m,147
KARINA,JUURIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U18 Neiud,2x18m,272
RASMUS,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,262
RASMUS,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,262
RASMUS,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,2x15m,524
RUDOLF,MATZEN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,252
RUDOLF,MATZEN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,251
RUDOLF,MATZEN,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,2x15m,503
TAIRO,PRIKS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,219
TAIRO,PRIKS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,233
TAIRO,PRIKS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,2x15m,452
MIHHAIL,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,223
MIHHAIL,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,217
MIHHAIL,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,2x15m,440
JAAN-JOHANNES,TOMINGAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,169
JAAN-JOHANNES,TOMINGAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,15m,163
JAAN-JOHANNES,TOMINGAS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Poisid,2x15m,332
THERESA DESIREE,NOOR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,252
THERESA DESIREE,NOOR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,257
THERESA DESIREE,NOOR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,2x15m,509
ANNABEL,KOIT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,256
ANNABEL,KOIT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,248
ANNABEL,KOIT,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,2x15m,504
KRISTELLE,LIUKONEN,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,253
KRISTELLE,LIUKONEN,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,250
KRISTELLE,LIUKONEN,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,2x15m,503
EGLE,KLANDORF,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,221
EGLE,KLANDORF,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,15m,198
EGLE,KLANDORF,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U15 Tüdrukud,2x15m,419
ARSENII,KAPLUN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,276
ARSENII,KAPLUN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,274
ARSENII,KAPLUN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,550
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,262
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,269
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,531
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,252
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,254
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,506
RATMIR,BABITŠEV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,252
RATMIR,BABITŠEV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,241
RATMIR,BABITŠEV,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,493
JOONAS,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,230
JOONAS,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,217
JOONAS,ÕUE,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,447
LAURI,ÕUN,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,216
LAURI,ÕUN,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,15m,187
LAURI,ÕUN,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Poisid,2x15m,403
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,241
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,252
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,493
ULJANA,VINGISSAR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,244
ULJANA,VINGISSAR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,247
ULJANA,VINGISSAR,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,491
LIISA,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,225
LIISA,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,232
LIISA,SIBRITS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,457
ULLA,TATTER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,210
ULLA,TATTER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,219
ULLA,TATTER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,429
KESSU,VIIL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,220
KESSU,VIIL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,187
KESSU,VIIL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,407
MARIANA,MATIICHUK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,190
MARIANA,MATIICHUK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,15m,167
MARIANA,MATIICHUK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Vaistuvibu - U13 Tüdrukud,2x15m,357
KAUR,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,158
KAUR,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,169
KAUR,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,327
URMAS,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,135
URMAS,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,191
URMAS,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,326
LEHO,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,174
LEHO,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,149
LEHO,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,323
MAXIM,LUBENETS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,155
MAXIM,LUBENETS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,154
MAXIM,LUBENETS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,309
MAKSIMS,REBROVS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,135
MAKSIMS,REBROVS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,148
MAKSIMS,REBROVS,STR Storm SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,283
ENN,LEHISSAAR,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,109
ENN,LEHISSAAR,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,116
ENN,LEHISSAAR,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,225
DIMO,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,95
DIMO,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,18m,118
DIMO,ORIEHOV,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Mehed,2x18m,213
SVETLANA,TATARLÕ,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,236
SVETLANA,TATARLÕ,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,234
SVETLANA,TATARLÕ,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,470
MARGE,MAISTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,172
MARGE,MAISTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,161
MARGE,MAISTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,333
MERLE,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,127
MERLE,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,151
MERLE,SILLAT,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,278
SIGRID,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,120
SIGRID,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,136
SIGRID,KONTUS,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,256
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,103
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,149
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,252
EERIKA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,108
EERIKA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,18m,77
EERIKA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Naised,2x18m,185
HEINO,TENNER,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,193
HEINO,TENNER,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,200
HEINO,TENNER,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),2x18m,393
MEELIS,PÄLLO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,183
MEELIS,PÄLLO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,183
MEELIS,PÄLLO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),2x18m,366
ALLAN,MÄNNIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,170
ALLAN,MÄNNIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,176
ALLAN,MÄNNIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),2x18m,346
KALJU,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,157
KALJU,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,166
KALJU,BAUMANN,LVL Lääne Vibulaskjad,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),2x18m,323
VELLO,ROOVER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,148
VELLO,ROOVER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),18m,116
VELLO,ROOVER,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (60+),2x18m,264
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,131
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,146
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),2x18m,277
TIINA,LAURISSON,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,94
TIINA,LAURISSON,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,112
TIINA,LAURISSON,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),2x18m,206
HILLE,KIRPU,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,99
HILLE,KIRPU,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),18m,44
HILLE,KIRPU,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (60+),2x18m,143
UNO,KUKK,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,166
UNO,KUKK,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,170
UNO,KUKK,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),2x18m,336
BORIS,MALÕŠEV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,147
BORIS,MALÕŠEV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,144
BORIS,MALÕŠEV,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),2x18m,291
AIN,SINIJÄRV,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,115
AIN,SINIJÄRV,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),18m,120
AIN,SINIJÄRV,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Mehed (50+),2x18m,235
ÜLLE,KELL,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,224
ÜLLE,KELL,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,210
ÜLLE,KELL,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),2x18m,434
PILLERIIN,JÄRVE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,136
PILLERIIN,JÄRVE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,146
PILLERIIN,JÄRVE,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),2x18m,282
TEA,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,102
TEA,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,123
TEA,KAASIK,KSK Kajamaa SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),2x18m,225
TATJANA,MALÕŠEVA,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,81
TATJANA,MALÕŠEVA,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),18m,94
TATJANA,MALÕŠEVA,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - Veteranid Naised (50+),2x18m,175
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,239
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,222
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,461
KENETH,JÕKS,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,237
KENETH,JÕKS,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,214
KENETH,JÕKS,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,451
VIKTOR,YEVSHYSHYN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,211
VIKTOR,YEVSHYSHYN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,220
VIKTOR,YEVSHYSHYN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,431
GERETH,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,211
GERETH,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,204
GERETH,SOESOO,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,415
KARL AUGUST,RANDOJA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,200
KARL AUGUST,RANDOJA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,211
KARL AUGUST,RANDOJA,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,411
ANDRI,LEIMAN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,173
ANDRI,LEIMAN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,164
ANDRI,LEIMAN,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,337
RIHARD,RAMMUL,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,135
RIHARD,RAMMUL,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,18m,166
RIHARD,RAMMUL,KVK Kagu Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed,2x18m,301
ARMIN,SELGIS,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,18m,149
ARMIN,SELGIS,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,18m,143
ARMIN,SELGIS,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,2x18m,292
MART,VAARIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,18m,128
MART,VAARIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,18m,146
MART,VAARIK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Noormehed Jätka,2x18m,274
ILONA,KALLAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,221
ILONA,KALLAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,231
ILONA,KALLAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,2x18m,452
KEITI,LUUP,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,226
KEITI,LUUP,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,215
KEITI,LUUP,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,2x18m,441
MIRIAM,LAGUTKIN,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,187
MIRIAM,LAGUTKIN,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,178
MIRIAM,LAGUTKIN,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,2x18m,365
DARLEEN,MUGUR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,137
DARLEEN,MUGUR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,110
DARLEEN,MUGUR,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,2x18m,247
ANETE,KINDEL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,131
ANETE,KINDEL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,18m,93
ANETE,KINDEL,SMA Saaremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U18 Neiud,2x18m,224
KARL,ANTSMÄE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,243
KARL,ANTSMÄE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,216
KARL,ANTSMÄE,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,2x15m,459
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,230
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,228
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,2x15m,458
KEVIN,RATASSEPP,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,223
KEVIN,RATASSEPP,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,231
KEVIN,RATASSEPP,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,2x15m,454
SEMEN,KIAKH,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,204
SEMEN,KIAKH,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,15m,210
SEMEN,KIAKH,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Poisid,2x15m,414
EMMA,HÜTT,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,240
EMMA,HÜTT,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,222
EMMA,HÜTT,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,462
RONJA RINITI,ROGGENBAUM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,237
RONJA RINITI,ROGGENBAUM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,224
RONJA RINITI,ROGGENBAUM,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,461
KERTTU,KEERDO,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,219
KERTTU,KEERDO,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,238
KERTTU,KEERDO,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,457
ANETTE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,219
ANETTE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,215
ANETTE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,434
BIRGIT,PIIR,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,214
BIRGIT,PIIR,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,217
BIRGIT,PIIR,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,431
HELENE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,191
HELENE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,188
HELENE,TALI,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,379
TUULI,SOOM,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,184
TUULI,SOOM,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,15m,147
TUULI,SOOM,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U15 Tüdrukud,2x15m,331
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,249
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,255
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,504
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,243
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,229
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,472
SEBASTIAN,ZIMMER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,228
SEBASTIAN,ZIMMER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,224
SEBASTIAN,ZIMMER,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,452
GEORG,VIITAK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,212
GEORG,VIITAK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,222
GEORG,VIITAK,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,434
PAUL JAKOB,VILMS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,211
PAUL JAKOB,VILMS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,209
PAUL JAKOB,VILMS,TLVK Tallinna VK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,420
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,212
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,15m,200
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Poisid,2x15m,412
GLORIA,TIIRIK,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,254
GLORIA,TIIRIK,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,257
GLORIA,TIIRIK,MAG Mägilased,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,2x15m,511
MARJELLA,ALLIKAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,230
MARJELLA,ALLIKAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,220
MARJELLA,ALLIKAS,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,2x15m,450
SOFIA ELISABETH,JÄRVI,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,209
SOFIA ELISABETH,JÄRVI,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,215
SOFIA ELISABETH,JÄRVI,SVK Saarde Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,2x15m,424
MARII,LEHTMETS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,168
MARII,LEHTMETS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,15m,122
MARII,LEHTMETS,VVVK Vana-Võidu VK/Viljandi SK,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud,2x15m,290
JANETE,LEHTMETS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,15m,118
JANETE,LEHTMETS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,15m,127
JANETE,LEHTMETS,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,2x15m,245
KENDRA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,15m,50
KENDRA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,15m,100
KENDRA,PORRO,VVK Vooremaa Vibuklubi,01.12.2024,Eesti sisekarikavõistluse finaal 2024,Pikkvibu - U13 Tüdrukud Jätka,2x15m,150
`,
  '02_08_2025_Noorte_Talvekarikas_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
ANNE,SEIN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,254
ANNE,SEIN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,266
ANNE,SEIN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,2x18m,520
RASMUS MIHKEL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,233
RASMUS MIHKEL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,241
RASMUS MIHKEL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,2x18m,474
KAROLIINA,KÜBAR,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,239
KAROLIINA,KÜBAR,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,232
KAROLIINA,KÜBAR,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,2x18m,471
EMILI,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,232
EMILI,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,18m,221
EMILI,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 21,2x18m,453
EMMA,KASK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,296
EMMA,KASK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,294
EMMA,KASK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,2x18m,590
LIISE,RÄTSEP,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,277
LIISE,RÄTSEP,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,275
LIISE,RÄTSEP,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,2x18m,552
VELEIA,OVSIANYTSKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,253
VELEIA,OVSIANYTSKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,267
VELEIA,OVSIANYTSKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,2x18m,520
ELERI,JAANISTE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,245
ELERI,JAANISTE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,18m,248
ELERI,JAANISTE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Women,2x18m,493
KERON,SAULUS,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,281
KERON,SAULUS,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,290
KERON,SAULUS,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,2x18m,571
MARTEN,SUITS,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,284
MARTEN,SUITS,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,285
MARTEN,SUITS,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,2x18m,569
KAAREL,PILLART,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,282
KAAREL,PILLART,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,18m,285
KAAREL,PILLART,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 18 Men,2x18m,567
KRENT,KAASIK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,276
KRENT,KAASIK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,272
KRENT,KAASIK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,2x15m,548
EKATERINA,NOVIKOVA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,267
EKATERINA,NOVIKOVA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,269
EKATERINA,NOVIKOVA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,2x15m,536
SIIM OLIVER,HIIE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,224
SIIM OLIVER,HIIE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,237
SIIM OLIVER,HIIE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,2x15m,461
JOONATAN,VAIKLO,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,154
JOONATAN,VAIKLO,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,15m,236
JOONATAN,VAIKLO,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 15,2x15m,390
KARITA,UUSELU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,283
KARITA,UUSELU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,283
KARITA,UUSELU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,2x15m,566
MARTEN,SOOVIK,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,276
MARTEN,SOOVIK,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,270
MARTEN,SOOVIK,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,2x15m,546
ELISABETH,DEDERER,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,251
ELISABETH,DEDERER,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,268
ELISABETH,DEDERER,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,2x15m,519
RASMUS,ELLAM,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,259
RASMUS,ELLAM,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,238
RASMUS,ELLAM,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,2x15m,497
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,236
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,15m,209
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,02.08.2025,Noorte Talvekarikas 2025,Recurve - Under 13,2x15m,445
PAUL,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 21,18m,252
PAUL,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 21,18m,254
PAUL,HANNI,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 21,2x18m,506
RASMUS,KANAMÄE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,18m,234
RASMUS,KANAMÄE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,18m,237
RASMUS,KANAMÄE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,2x18m,471
ARMIN,SELGIS,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,18m,132
ARMIN,SELGIS,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,18m,151
ARMIN,SELGIS,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 18 Men,2x18m,283
MIIA,KERDE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,292
MIIA,KERDE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,296
MIIA,KERDE,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,2x15m,588
VANESSA,VAGUL,TVSK,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,281
VANESSA,VAGUL,TVSK,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,283
VANESSA,VAGUL,TVSK,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,2x15m,564
ERON MATRI,MIKKU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,277
ERON MATRI,MIKKU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,276
ERON MATRI,MIKKU,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,2x15m,553
JETTE,MARTINFELD,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,261
JETTE,MARTINFELD,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,15m,255
JETTE,MARTINFELD,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Compound - Under 15,2x15m,516
RAO KAAREL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,257
RAO KAAREL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,256
RAO KAAREL,LÕPP,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,513
SIMONA,JERMANN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,250
SIMONA,JERMANN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,259
SIMONA,JERMANN,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,509
JOONATAN,VALK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,257
JOONATAN,VALK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,250
JOONATAN,VALK,TVSK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,507
RASMUS,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,236
RASMUS,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,250
RASMUS,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,486
ALIAKSANDRA,PETRUSHENKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,237
ALIAKSANDRA,PETRUSHENKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,238
ALIAKSANDRA,PETRUSHENKA,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,475
IVAN,BLAGI,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,198
IVAN,BLAGI,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,200
IVAN,BLAGI,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,398
NIKITA,VALASHAS,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,203
NIKITA,VALASHAS,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,179
NIKITA,VALASHAS,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,382
MIRELLE,POMMER,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,166
MIRELLE,POMMER,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,18m,184
MIRELLE,POMMER,SAG Sagittarius,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 18,2x18m,350
THERESA DESIREE,NOOR,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,264
THERESA DESIREE,NOOR,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,264
THERESA DESIREE,NOOR,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,2x15m,528
TAIRO,PRIKS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,223
TAIRO,PRIKS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,225
TAIRO,PRIKS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,2x15m,448
KRISTELLE,LIUKONEN,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,192
KRISTELLE,LIUKONEN,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,215
KRISTELLE,LIUKONEN,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,2x15m,407
LIISA,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,148
LIISA,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,15m,206
LIISA,SIBRITS,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 15,2x15m,354
RATMIR,BABITŠEV,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,15m,254
RATMIR,BABITŠEV,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,15m,270
RATMIR,BABITŠEV,STR Est-Str,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,2x15m,524
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,15m,257
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,15m,250
ALEKSANDR,TATARLÕ,TLVK Tallinna VK,02.08.2025,Noorte Talvekarikas 2025,Barebow - Under 13 Men,2x15m,507
KERTTU,KEERDO,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,218
KERTTU,KEERDO,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,197
KERTTU,KEERDO,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,2x18m,415
KENETH,JÕKS,KVK Kagu VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,216
KENETH,JÕKS,KVK Kagu VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,195
KENETH,JÕKS,KVK Kagu VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,2x18m,411
TUULI,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,66
TUULI,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,18m,101
TUULI,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 18,2x18m,167
KEVIN,RATASSEPP,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,15m,215
KEVIN,RATASSEPP,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,15m,223
KEVIN,RATASSEPP,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,2x15m,438
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,15m,108
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,15m,194
CHRISTIAN MATHIAS,KOLBERG,MAG Mägilased,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 15 Men,2x15m,302
ELLA-JOANNA,SALUMAA,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,15m,204
ELLA-JOANNA,SALUMAA,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,15m,226
ELLA-JOANNA,SALUMAA,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,2x15m,430
KENDRA,PORRO,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,15m,162
KENDRA,PORRO,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,15m,192
KENDRA,PORRO,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women,2x15m,354
MARIANN ELERI,MILLER,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,151
MARIANN ELERI,MILLER,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,197
MARIANN ELERI,MILLER,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,2x15m,348
JOHANNA,TAKKING,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,173
JOHANNA,TAKKING,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,159
JOHANNA,TAKKING,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,2x15m,332
TEELE,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,101
TEELE,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,15m,121
TEELE,SOOM,VVK Vooremaa VK,02.08.2025,Noorte Talvekarikas 2025,Longbow - Under 13 Women Continue,2x15m,222
`,
  '03_05_2025_Pärnu_Avavõistlus_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
ROMANS,SERGEJEVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,313
ROMANS,SERGEJEVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,316
ROMANS,SERGEJEVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,629
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,303
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,305
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,608
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,309
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,289
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,598
PRIIT,TANVEL,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,281
PRIIT,TANVEL,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,304
PRIIT,TANVEL,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,585
GLEBS,KONONOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,280
GLEBS,KONONOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,289
GLEBS,KONONOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,569
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,274
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,284
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,558
TAIVO,MURUMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,160
TAIVO,MURUMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,70m,197
TAIVO,MURUMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Men,2x70m,357
TRIINU,LILIENTHAL,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,322
TRIINU,LILIENTHAL,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,301
TRIINU,LILIENTHAL,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,623
JELENA,KONONOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,274
JELENA,KONONOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,302
JELENA,KONONOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,576
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,273
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,295
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,568
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,260
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,246
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,506
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,238
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,244
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,482
MARET,TAMME,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,223
MARET,TAMME,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,228
MARET,TAMME,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,451
TESSA CATHLEN,TAMMIK,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,207
TESSA CATHLEN,TAMMIK,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,70m,229
TESSA CATHLEN,TAMMIK,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Women,2x70m,436
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,273
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,274
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,2x70m,547
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,280
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,266
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,2x70m,546
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,213
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,277
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,2x70m,490
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,242
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,70m,177
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Men,2x70m,419
MARTA,RUNIŠKOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,275
MARTA,RUNIŠKOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,270
MARTA,RUNIŠKOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,2x70m,545
EMILI,HANNI,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,241
EMILI,HANNI,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,284
EMILI,HANNI,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,2x70m,525
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,233
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,260
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,2x70m,493
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,213
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,207
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,2x70m,420
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,98
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,70m,121
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 21 Women,2x70m,219
MARTEN,SUITS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,280
MARTEN,SUITS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,282
MARTEN,SUITS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,562
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,277
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,274
EGERT,PÄHKEL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,551
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,255
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,282
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,537
KAAREL,PILLART,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,263
KAAREL,PILLART,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,264
KAAREL,PILLART,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,527
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,258
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,266
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,524
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,246
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,270
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,516
RENE,ALEKSANDROV,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,158
RENE,ALEKSANDROV,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,60m,157
RENE,ALEKSANDROV,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Men,2x60m,315
EMMA,KASK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women,60m,299
EMMA,KASK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women,60m,311
EMMA,KASK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women,2x60m,610
LIJA VIKTORIJA,SEIBUTE,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,301
LIJA VIKTORIJA,SEIBUTE,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,293
LIJA VIKTORIJA,SEIBUTE,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,594
NORA,HAAS,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,238
NORA,HAAS,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,281
NORA,HAAS,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,519
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,229
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,264
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,493
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,232
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,232
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,464
VELEIA,OVSIANYTSKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,221
VELEIA,OVSIANYTSKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,236
VELEIA,OVSIANYTSKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,457
KETTER,SILT,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,230
KETTER,SILT,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,226
KETTER,SILT,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,456
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,223
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,221
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,444
LISETE,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,214
LISETE,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,230
LISETE,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,444
ELERI,JAANISTE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,212
ELERI,JAANISTE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,60m,169
ELERI,JAANISTE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 18 Women Jätka,2x60m,381
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,321
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,325
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,646
MÄRT,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,320
MÄRT,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,311
MÄRT,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,631
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,315
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,294
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,609
SEMEN,KIIAKH,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,283
SEMEN,KIIAKH,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,291
SEMEN,KIIAKH,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,574
NIKITA,SAZONOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,257
NIKITA,SAZONOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,272
NIKITA,SAZONOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,529
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,236
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,272
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,508
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,235
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,209
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,444
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,157
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,30m,187
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Men,2x30m,344
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,326
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,315
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,2x30m,641
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,283
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,287
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,2x30m,570
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,277
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,289
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,2x30m,566
EKATERINA,NOVIKOVA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,257
EKATERINA,NOVIKOVA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,30m,288
EKATERINA,NOVIKOVA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 15 Women,2x30m,545
JAANUS,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,306
JAANUS,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,307
JAANUS,GROSS,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,2x60m,613
TIIT,HEINSALU,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,265
TIIT,HEINSALU,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,271
TIIT,HEINSALU,SJV Suure-Jaani Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,2x60m,536
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,246
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,60m,250
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Men,2x60m,496
RIMMA,MATVEJEVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,294
RIMMA,MATVEJEVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,296
RIMMA,MATVEJEVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,2x60m,590
TATJANA,JEVDOKIMOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,271
TATJANA,JEVDOKIMOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,277
TATJANA,JEVDOKIMOVA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,2x60m,548
JULIJA,OLEKSEJENKO,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,239
JULIJA,OLEKSEJENKO,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,60m,235
JULIJA,OLEKSEJENKO,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve 50+ Women,2x60m,474
EMIL JOHANNES,VÄLJA,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,336
EMIL JOHANNES,VÄLJA,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,326
EMIL JOHANNES,VÄLJA,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,2x15m,662
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,315
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,327
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,2x15m,642
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,304
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,301
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,2x15m,605
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,304
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,15m,290
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men,2x15m,594
HENRI,LEINSAAR,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,285
HENRI,LEINSAAR,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,282
HENRI,LEINSAAR,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,2x15m,567
ERKI,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,238
ERKI,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,282
ERKI,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,2x15m,520
RASMUS,ELLAM,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,252
RASMUS,ELLAM,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,15m,232
RASMUS,ELLAM,JVI JVK Ilves,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Men Jätka,2x15m,484
RONJA,ROSTA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,339
RONJA,ROSTA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,346
RONJA,ROSTA,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,2x15m,685
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,334
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,335
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,2x15m,669
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,338
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,326
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,2x15m,664
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,317
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,15m,299
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Recurve Under 13 Women,2x15m,616
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,279
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,294
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,2x30m,573
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,263
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,299
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,2x30m,562
HAIDI,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,250
HAIDI,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,30m,267
HAIDI,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Recurve Open 30 Women,2x30m,517
EVERT,RESSAR,BH Baltic Hunter SC,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,343
EVERT,RESSAR,BH Baltic Hunter SC,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,347
EVERT,RESSAR,BH Baltic Hunter SC,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,690
CAIUS,KAND,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,339
CAIUS,KAND,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,336
CAIUS,KAND,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,675
VIKTOR,LUTŠKA,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,336
VIKTOR,LUTŠKA,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,323
VIKTOR,LUTŠKA,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,659
REIMO,LOORENTS,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,301
REIMO,LOORENTS,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,319
REIMO,LOORENTS,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,620
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,291
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,302
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,593
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,252
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,50m,272
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Men,2x50m,524
KRISTI,ILVES,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,50m,339
KRISTI,ILVES,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,50m,339
KRISTI,ILVES,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,2x50m,678
MARIS,TETSMANN,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,50m,331
MARIS,TETSMANN,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,50m,338
MARIS,TETSMANN,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Women,2x50m,669
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,50m,334
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,50m,341
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,2x50m,675
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,50m,295
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,50m,269
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 18 Men,2x50m,564
LIISE,KUUSK,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,348
LIISE,KUUSK,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,351
LIISE,KUUSK,TYRI Türi Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,2x30m,699
MIIA,KERDE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,344
MIIA,KERDE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,351
MIIA,KERDE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,2x30m,695
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,339
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,30m,330
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 15 Women,2x30m,669
TARMO,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound 50+ Men,50m,283
TARMO,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound 50+ Men,50m,284
TARMO,KANAMÄE,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Compound 50+ Men,2x50m,567
GERT-RAYDER,PENING,LVL Lääne vibulaskjad,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 13 Men,15m,339
GERT-RAYDER,PENING,LVL Lääne vibulaskjad,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 13 Men,15m,351
GERT-RAYDER,PENING,LVL Lääne vibulaskjad,03.05.2025,Pärnu Avavõistlus 2025,Compound Under 13 Men,2x15m,690
NIKITA,VALASHAS,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Men,30m,166
NIKITA,VALASHAS,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Men,30m,135
NIKITA,VALASHAS,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Men,2x30m,301
ALIAKSANDRA,PETRUSHENKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Women,30m,254
ALIAKSANDRA,PETRUSHENKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Women,30m,250
ALIAKSANDRA,PETRUSHENKA,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 18 Women,2x30m,504
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 15 Men,15m,292
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 15 Men,15m,287
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 15 Men,2x15m,579
KALJU,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Men,30m,283
KALJU,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Men,30m,257
KALJU,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Men,2x30m,540
KERSTI,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Women,30m,291
KERSTI,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Women,30m,269
KERSTI,BAUMANN,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Barebow 50+ Women,2x30m,560
VLADIMIR,ODINOKOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 13 Men,15m,254
VLADIMIR,ODINOKOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 13 Men,15m,274
VLADIMIR,ODINOKOV,STO Storm SK,03.05.2025,Pärnu Avavõistlus 2025,Barebow Under 13 Men,2x15m,528
MARGE,MAISTE,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Women,50m,135
MARGE,MAISTE,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Women,50m,73
MARGE,MAISTE,SVK Saarde Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Women,2x50m,208
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,201
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,234
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,2x30m,435
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,176
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,166
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,2x30m,342
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,132
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,30m,149
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 18 Men,2x30m,281
HEINO,TENNER,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,30m,308
HEINO,TENNER,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,30m,306
HEINO,TENNER,KSK Kajamaa SK,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,2x30m,614
ALEKSEJS,RUNIŠKOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,30m,284
ALEKSEJS,RUNIŠKOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,30m,301
ALEKSEJS,RUNIŠKOVS,AMA Amazones,03.05.2025,Pärnu Avavõistlus 2025,Longbow 50+ Men,2x30m,585
HOLGER,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,313
HOLGER,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,317
HOLGER,PEIPS,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,2x15m,630
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,305
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,305
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,2x15m,610
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,285
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,262
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,2x15m,547
MORTEN,LILLEMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,247
MORTEN,LILLEMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,15m,217
MORTEN,LILLEMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Men,2x15m,464
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Women,15m,246
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Women,15m,264
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,03.05.2025,Pärnu Avavõistlus 2025,Longbow Under 13 Women,2x15m,510
`,
  '04_05_2025_Karoline_Cup.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
TRIINU,LILIENTHAL,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,303
TRIINU,LILIENTHAL,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,307
TRIINU,LILIENTHAL,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,2x70m,610
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Recurve Adults,70m,307
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Recurve Adults,70m,280
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Recurve Adults,2x70m,587
KARL,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,272
KARL,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,283
KARL,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,2x70m,555
AIVO,AGU,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,235
AIVO,AGU,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,70m,245
AIVO,AGU,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Adults,2x70m,480
EMMA,KASK,TVSK Tartu Valla Spordiklubi,04.05.2025,Karoline Cup,Recurve Under 18,60m,295
EMMA,KASK,TVSK Tartu Valla Spordiklubi,04.05.2025,Karoline Cup,Recurve Under 18,60m,293
EMMA,KASK,TVSK Tartu Valla Spordiklubi,04.05.2025,Karoline Cup,Recurve Under 18,2x60m,588
LISETTE MARIE,GOLD,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 18,60m,184
LISETTE MARIE,GOLD,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 18,60m,249
LISETTE MARIE,GOLD,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 18,2x60m,433
KAROLINE,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 15 Women,30m,299
KAROLINE,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 15 Women,30m,325
KAROLINE,KIVILO,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 15 Women,2x30m,624
MARTEN,SOOVIK,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,332
MARTEN,SOOVIK,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,331
MARTEN,SOOVIK,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,2x15m,663
AIN MARKUS,VÄLJA,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,320
AIN MARKUS,VÄLJA,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,326
AIN MARKUS,VÄLJA,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,2x15m,646
RASMUS,ELLAM,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,274
RASMUS,ELLAM,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,15m,282
RASMUS,ELLAM,JVI JVK Ilves,04.05.2025,Karoline Cup,Recurve Under 13,2x15m,556
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Longbow Under 13 Men,15m,268
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Longbow Under 13 Men,15m,275
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,04.05.2025,Karoline Cup,Longbow Under 13 Men,2x15m,543
`,
  '04_10_2025_Lumemangud.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Men,70m,313
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Men,70m,309
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Men,2x70m,622
TANEL,KAASIK,TVLK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,70m,301
TANEL,KAASIK,TVLK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,70m,314
TANEL,KAASIK,TVLK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,2x70m,615
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,70m,319
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,70m,291
PRIIT,TANVEL,TLVK Tallinna Vibukool,04.10.2025,Lumemängud,Recurve Men,2x70m,610
AIVO,AGU,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Men,70m,288
AIVO,AGU,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Men,70m,279
AIVO,AGU,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Men,2x70m,567
HANNES,KRAAV,TL TäheLend,04.10.2025,Lumemängud,Recurve Men,70m,279
HANNES,KRAAV,TL TäheLend,04.10.2025,Lumemängud,Recurve Men,70m,273
HANNES,KRAAV,TL TäheLend,04.10.2025,Lumemängud,Recurve Men,2x70m,552
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Women,70m,307
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Women,70m,300
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Women,2x70m,607
JELENA,KONONOVA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,70m,296
JELENA,KONONOVA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,70m,293
JELENA,KONONOVA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,2x70m,589
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,70m,309
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,70m,277
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,2x70m,586
L?GA ILONA,DE?ISENOKA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,70m,250
L?GA ILONA,DE?ISENOKA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,70m,254
L?GA ILONA,DE?ISENOKA,AMA Amazones,04.10.2025,Lumemängud,Recurve Women,2x70m,504
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,70m,129
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,70m,165
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Women,2x70m,294
MIKK,MIHKELSON,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,70m,290
MIKK,MIHKELSON,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,70m,292
MIKK,MIHKELSON,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,2x70m,582
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,70m,282
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,70m,282
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 21,2x70m,564
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,259
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,267
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,2x70m,526
MIREL,MISSIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,238
MIREL,MISSIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,238
MIREL,MISSIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,2x70m,476
ANDRES,SARAPUU,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,208
ANDRES,SARAPUU,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,264
ANDRES,SARAPUU,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,2x70m,472
GERETH,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,213
GERETH,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,70m,241
GERETH,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 21,2x70m,454
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,291
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,290
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,2x60m,581
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,280
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,290
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,2x60m,570
KAROLINE,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 18,60m,272
KAROLINE,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 18,60m,294
KAROLINE,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 18,2x60m,566
MARTEN,MÄGER,PVM Pärnu Meelis,04.10.2025,Lumemängud,Recurve Under 18,60m,273
MARTEN,MÄGER,PVM Pärnu Meelis,04.10.2025,Lumemängud,Recurve Under 18,60m,287
MARTEN,MÄGER,PVM Pärnu Meelis,04.10.2025,Lumemängud,Recurve Under 18,2x60m,560
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,241
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,248
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,2x60m,489
KARL,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,86
KARL,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,60m,116
KARL,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 18,2x60m,202
JAAN JAREK,ALLIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,303
JAAN JAREK,ALLIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,307
JAAN JAREK,ALLIK,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,2x30m,610
STELLA,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,274
STELLA,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,259
STELLA,ÕISMAA,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,2x30m,533
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,233
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,30m,235
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 15,2x30m,468
MARTEN,SOOVIK,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,339
MARTEN,SOOVIK,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,342
MARTEN,SOOVIK,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,2x15m,681
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,332
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,345
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,2x15m,677
ELIISE MARIE,KALDA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,337
ELIISE MARIE,KALDA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,335
ELIISE MARIE,KALDA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,2x15m,672
RONJA,ROSTA,AMA Amazones,04.10.2025,Lumemängud,Recurve Under 13,15m,336
RONJA,ROSTA,AMA Amazones,04.10.2025,Lumemängud,Recurve Under 13,15m,336
RONJA,ROSTA,AMA Amazones,04.10.2025,Lumemängud,Recurve Under 13,2x15m,672
EMIL JOHANNES,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,326
EMIL JOHANNES,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,313
EMIL JOHANNES,VÄLJA,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,2x15m,639
RASMUS,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,307
RASMUS,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,15m,320
RASMUS,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Recurve Under 13,2x15m,627
LENART,LEMBER,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 13,15m,290
LENART,LEMBER,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 13,15m,311
LENART,LEMBER,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Recurve Under 13,2x15m,601
EDUARDS,LAPSINS,AMA Amazones,04.10.2025,Lumemängud,Recurve 50+ Men,60m,292
EDUARDS,LAPSINS,AMA Amazones,04.10.2025,Lumemängud,Recurve 50+ Men,60m,305
EDUARDS,LAPSINS,AMA Amazones,04.10.2025,Lumemängud,Recurve 50+ Men,2x60m,597
KARL,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Compound Men,50m,321
KARL,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Compound Men,50m,309
KARL,KIVILO,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Compound Men,2x50m,630
DAINIS,JANSONS,LPK Amazones LPK,04.10.2025,Lumemängud,Compound Men,50m,296
DAINIS,JANSONS,LPK Amazones LPK,04.10.2025,Lumemängud,Compound Men,50m,316
DAINIS,JANSONS,LPK Amazones LPK,04.10.2025,Lumemängud,Compound Men,2x50m,612
GERT,SOE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 18 Men,50m,260
GERT,SOE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 18 Men,50m,269
GERT,SOE,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 18 Men,2x50m,529
ERKI,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 13 Men,15m,121
ERKI,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 13 Men,15m,106
ERKI,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Compound Under 13 Men,2x15m,227
TARMO,KANAMÄE,SAG Sagittarius,04.10.2025,Lumemängud,Compound 50+ Men,50m,287
TARMO,KANAMÄE,SAG Sagittarius,04.10.2025,Lumemängud,Compound 50+ Men,50m,301
TARMO,KANAMÄE,SAG Sagittarius,04.10.2025,Lumemängud,Compound 50+ Men,2x50m,588
PAUL,VILLEMI,SAG Sagittarius,04.10.2025,Lumemängud,Barebow Men,50m,297
PAUL,VILLEMI,SAG Sagittarius,04.10.2025,Lumemängud,Barebow Men,50m,302
PAUL,VILLEMI,SAG Sagittarius,04.10.2025,Lumemängud,Barebow Men,2x50m,599
JÜRGEN,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Barebow Under 18 Men,30m,259
JÜRGEN,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Barebow Under 18 Men,30m,259
JÜRGEN,ELLAM,JVI Järvakandi Ilves,04.10.2025,Lumemängud,Barebow Under 18 Men,2x30m,518
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Barebow Under 13 Women,15m,257
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Barebow Under 13 Women,15m,280
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Barebow Under 13 Women,2x15m,537
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,04.10.2025,Lumemängud,Longbow Under 13,15m,294
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,04.10.2025,Lumemängud,Longbow Under 13,15m,288
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,04.10.2025,Lumemängud,Longbow Under 13,2x15m,582
HOLGER,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Longbow Under 13,15m,21
HOLGER,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Longbow Under 13,15m,105
HOLGER,PEIPS,VILJ Vana-Võidu VK / Viljandi SK,04.10.2025,Lumemängud,Longbow Under 13,2x15m,126
`,
  '10_05_2024_Lumemangud.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,70m,307
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,70m,308
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,2x70m,615
TANEL,KAASIK,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,70m,311
TANEL,KAASIK,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,70m,302
TANEL,KAASIK,TLVK Tallinna Vibukool,10.05.2024,Lumemängud,Sportvibu - mehed,2x70m,613
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,286
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,311
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,2x70m,597
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,279
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,298
HANNES,KRAAV,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,2x70m,577
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,282
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,70m,285
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - mehed,2x70m,567
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,315
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,314
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,2x70m,629
BESSI,KASAK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,307
BESSI,KASAK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,302
BESSI,KASAK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,2x70m,609
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,238
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,70m,227
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - naised,2x70m,465
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,275
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,286
TARVET,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,2x70m,561
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,277
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,272
BIRGIT,METSJÕE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,2x70m,549
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,230
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,70m,257
ANDRES,SARAPUU,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U21,2x70m,487
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,258
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,282
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,2x60m,540
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,249
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,277
PATRICK,JÄRVE,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,2x60m,526
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,213
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,201
MÄRT,LABI,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,2x60m,414
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,180
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,60m,215
MAIK,BILITJUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 noormehed,2x60m,395
EMMA,KASK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,307
EMMA,KASK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,299
EMMA,KASK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U18 neiud,2x60m,606
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,257
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,254
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,2x60m,511
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,248
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,232
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,2x60m,480
KETTER,SILT,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,214
KETTER,SILT,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,250
KETTER,SILT,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U18 neiud,2x60m,464
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,241
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,60m,200
MIREL,MISSIK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U18 neiud,2x60m,441
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U15,30m,327
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U15,30m,313
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U15,2x30m,640
KRENT,KAASIK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U15,30m,315
KRENT,KAASIK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U15,30m,298
KRENT,KAASIK,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Sportvibu - U15,2x30m,613
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U15,30m,286
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U15,30m,313
NAZAR,KVASHUK,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U15,2x30m,599
RENE,ALEKSANDROV,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - U15,30m,300
RENE,ALEKSANDROV,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - U15,30m,296
RENE,ALEKSANDROV,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - U15,2x30m,596
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,313
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,309
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,2x15m,622
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U13,15m,310
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U13,15m,306
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - U13,2x15m,616
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,295
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,308
LOVISA,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,2x15m,603
LENART,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,248
LENART,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,15m,294
LENART,LEMBER,VVVK Vana-Võidu VK/Viljandi SK,10.05.2024,Lumemängud,Sportvibu - U13,2x15m,542
VALDAS,JUOZAITIS,AS Auksinis Saulys,10.05.2024,Lumemängud,Sportvibu - 50+,60m,292
VALDAS,JUOZAITIS,AS Auksinis Saulys,10.05.2024,Lumemängud,Sportvibu - 50+,60m,288
VALDAS,JUOZAITIS,AS Auksinis Saulys,10.05.2024,Lumemängud,Sportvibu - 50+,2x60m,580
TIIT,HEINSALU,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - 50+,60m,280
TIIT,HEINSALU,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - 50+,60m,276
TIIT,HEINSALU,SJVK Suure-Jaani Vibuklubi,10.05.2024,Lumemängud,Sportvibu - 50+,2x60m,556
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - 50+,60m,257
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - 50+,60m,269
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,10.05.2024,Lumemängud,Sportvibu - 50+,2x60m,526
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Vaistuvibu - U21 mehed,30m,165
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Vaistuvibu - U21 mehed,30m,163
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordikool,10.05.2024,Lumemängud,Vaistuvibu - U21 mehed,2x30m,328
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,245
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,267
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,2x30m,512
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,252
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,244
MARJU-LY,KAARJÄRV,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,2x30m,496
ENN,SALU,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,249
ENN,SALU,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,30m,225
ENN,SALU,VVK Vooremaa Vibuklubi,10.05.2024,Lumemängud,Pikkvibu - 50+,2x30m,474
`,
  '10_05_2025_Puiatu_Kevadnooled.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
MARTIN,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,318
MARTIN,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,314
MARTIN,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,632
KAIT,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,305
KAIT,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,311
KAIT,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,616
JAANUS,GROSS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,290
JAANUS,GROSS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,294
JAANUS,GROSS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,584
ARE,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,292
ARE,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,287
ARE,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,579
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,276
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,299
PRIIT,TANVEL,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,575
TAIVO,MURUMÄE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,124
TAIVO,MURUMÄE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,70m,171
TAIVO,MURUMÄE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Men,2x70m,295
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,298
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,302
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,600
JAANIKA,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,274
JAANIKA,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,293
JAANIKA,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,567
BIRGIT,METSJÕE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,282
BIRGIT,METSJÕE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,260
BIRGIT,METSJÕE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,542
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,263
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,263
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,526
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,237
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,255
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,492
MARET,TAMME,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,208
MARET,TAMME,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,70m,202
MARET,TAMME,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Women,2x70m,410
TIIT,HEINSALU,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,60m,246
TIIT,HEINSALU,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,60m,264
TIIT,HEINSALU,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,2x60m,510
PRIIT,PRAMANN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,60m,244
PRIIT,PRAMANN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,60m,234
PRIIT,PRAMANN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Veteran Men,2x60m,478
TARVET,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,280
TARVET,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,274
TARVET,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,2x70m,554
PATRICK,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,277
PATRICK,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,254
PATRICK,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,2x70m,531
GERETH,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,231
GERETH,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,219
GERETH,SOESOO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,2x70m,450
MAVERIK,VALEND,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,164
MAVERIK,VALEND,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,70m,119
MAVERIK,VALEND,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 21 Men,2x70m,283
MARTEN,SUITS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,291
MARTEN,SUITS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,301
MARTEN,SUITS,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,592
MIKK,MIHKELSON,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,282
MIKK,MIHKELSON,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,276
MIKK,MIHKELSON,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,558
MÄRT,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,288
MÄRT,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,252
MÄRT,LABI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,540
KAAREL,PILLART,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,262
KAAREL,PILLART,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,258
KAAREL,PILLART,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,520
RENE,ALEKSANDROV,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,267
RENE,ALEKSANDROV,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,240
RENE,ALEKSANDROV,SJK Suure-Jaani VK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,507
ARDO,OJAMETS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,238
ARDO,OJAMETS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,259
ARDO,OJAMETS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,497
MARTEN,MÄGER,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,242
MARTEN,MÄGER,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,232
MARTEN,MÄGER,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,474
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,227
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,202
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,429
UKU,RIISENBERG,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,136
UKU,RIISENBERG,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,60m,121
UKU,RIISENBERG,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Men,2x60m,257
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,60m,250
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,60m,274
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,2x60m,524
SAIRE,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,60m,135
SAIRE,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,60m,50
SAIRE,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 18 Women,2x60m,185
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,323
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,297
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,620
NAZAR,KVASHUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,296
NAZAR,KVASHUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,295
NAZAR,KVASHUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,591
OTTO,MIKKOR,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,295
OTTO,MIKKOR,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,292
OTTO,MIKKOR,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,587
SEMEN,KIIAKH,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,264
SEMEN,KIIAKH,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,281
SEMEN,KIIAKH,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,545
BRONEK,IBRUS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,262
BRONEK,IBRUS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,248
BRONEK,IBRUS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,510
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,237
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,244
JAAN JAREK,ALLIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,481
JOOSEP HENDRIK,OJA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,193
JOOSEP HENDRIK,OJA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,173
JOOSEP HENDRIK,OJA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,366
KEIRO,MÄNNIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,154
KEIRO,MÄNNIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,30m,160
KEIRO,MÄNNIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Men,2x30m,314
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,334
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,306
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,2x30m,640
STELLA,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,280
STELLA,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,315
STELLA,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,2x30m,595
SANDRA,LÕOKE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,265
SANDRA,LÕOKE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,30m,242
SANDRA,LÕOKE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 15 Women,2x30m,507
MARTEN,SOOVIK,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,333
MARTEN,SOOVIK,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,334
MARTEN,SOOVIK,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,667
RAIKO,LUIK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,303
RAIKO,LUIK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,324
RAIKO,LUIK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,627
RASMUS,ELLAM,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,302
RASMUS,ELLAM,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,311
RASMUS,ELLAM,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,613
LENART,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,303
LENART,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,300
LENART,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,603
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,299
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,287
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,586
MAREK,PILLMAA,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,275
MAREK,PILLMAA,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,285
MAREK,PILLMAA,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,560
ERKI,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,265
ERKI,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,15m,265
ERKI,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Men,2x15m,530
LOVISA,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,336
LOVISA,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,318
LOVISA,LEMBER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,2x15m,654
MARII,LEHTMETS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,318
MARII,LEHTMETS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,318
MARII,LEHTMETS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,2x15m,636
MILEENE,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,308
MILEENE,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,291
MILEENE,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,2x15m,599
ELEANOR,KÕOMÄGI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,235
ELEANOR,KÕOMÄGI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,15m,238
ELEANOR,KÕOMÄGI,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recurve Under 13 Women,2x15m,473
AIVAR,PRUULI,BH Baltic Hunter SC,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,335
AIVAR,PRUULI,BH Baltic Hunter SC,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,333
AIVAR,PRUULI,BH Baltic Hunter SC,10.05.2025,Puiatu Kevadnooled,Compound Men,2x50m,668
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,316
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,326
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,2x50m,642
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,308
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,300
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,2x50m,608
REIMO,LOORENTS,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,288
REIMO,LOORENTS,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,50m,52
REIMO,LOORENTS,SVK Saarde Vibuklubi,10.05.2025,Puiatu Kevadnooled,Compound Men,2x50m,340
KRISTI,ILVES,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,50m,332
KRISTI,ILVES,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,50m,339
KRISTI,ILVES,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,2x50m,671
MARIS,TETSMANN,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,50m,322
MARIS,TETSMANN,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,50m,333
MARIS,TETSMANN,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Women,2x50m,655
AKSEL,TÄHEPÕLD,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 21 Men,50m,317
AKSEL,TÄHEPÕLD,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 21 Men,50m,311
AKSEL,TÄHEPÕLD,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 21 Men,2x50m,628
OSKAR,TOMINGAS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,50m,306
OSKAR,TOMINGAS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,50m,306
OSKAR,TOMINGAS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,2x50m,612
GERT,SOE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,50m,198
GERT,SOE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,50m,255
GERT,SOE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Men,2x50m,453
LIISE,KUUSK,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,50m,288
LIISE,KUUSK,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,50m,303
LIISE,KUUSK,TYRI Türi Vibukool,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,2x50m,591
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,50m,160
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,50m,180
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Compound Under 18 Women,2x50m,340
MIIA,KERDE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 15 Women,30m,350
MIIA,KERDE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 15 Women,30m,351
MIIA,KERDE,SAG Sagittarius,10.05.2025,Puiatu Kevadnooled,Compound Under 15 Women,2x30m,701
JAAN,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Men,50m,244
JAAN,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Men,50m,219
JAAN,RÖSLER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Men,2x50m,463
ARSENII,KAPLUN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Under 15 Men,15m,318
ARSENII,KAPLUN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Under 15 Men,15m,312
ARSENII,KAPLUN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Barebow Under 15 Men,2x15m,630
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Barebow Under 13 Men,15m,276
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Barebow Under 13 Men,15m,286
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Barebow Under 13 Men,2x15m,562
VELLO,ROOVEER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Men,50m,137
VELLO,ROOVEER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Men,50m,153
VELLO,ROOVEER,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Men,2x50m,290
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2025,Puiatu Kevadnooled,Longbow 50+ Women,30m,268
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2025,Puiatu Kevadnooled,Longbow 50+ Women,30m,240
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,10.05.2025,Puiatu Kevadnooled,Longbow 50+ Women,2x30m,508
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,255
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,269
MAKSYM,ROSSOKHA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,2x30m,524
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,246
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,264
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,2x30m,510
ANDRI,LEIMAN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,113
ANDRI,LEIMAN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,122
ANDRI,LEIMAN,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,2x30m,235
ATS JOOSEP,PÕDRA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,91
ATS JOOSEP,PÕDRA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,30m,76
ATS JOOSEP,PÕDRA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 18 Men,2x30m,167
HOLGER,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,320
HOLGER,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,316
HOLGER,PEIPS,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,2x15m,636
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,282
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,268
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,2x15m,550
MORTEN,LILLEMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,188
MORTEN,LILLEMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,15m,202
MORTEN,LILLEMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Men,2x15m,390
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Women,15m,231
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Women,15m,243
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,10.05.2025,Puiatu Kevadnooled,Longbow Under 13 Women,2x15m,474
KARL ROBIN,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,292
KARL ROBIN,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,298
KARL ROBIN,JÄRVE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,2x30m,590
KAIN,ILVES,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,286
KAIN,ILVES,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,274
KAIN,ILVES,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,2x30m,560
MARTIN,VIIRPALU,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,240
MARTIN,VIIRPALU,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,242
MARTIN,VIIRPALU,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,2x30m,482
KARL,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,225
KARL,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,30m,229
KARL,ÕISMAA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Men,2x30m,454
LAURA,SOOTNA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,302
LAURA,SOOTNA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,317
LAURA,SOOTNA,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,2x30m,619
LUISA,KASUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,289
LUISA,KASUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,296
LUISA,KASUK,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,2x30m,585
ADRIANA,MASS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,276
ADRIANA,MASS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,302
ADRIANA,MASS,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,2x30m,578
KIRKE,SARAPU,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,267
KIRKE,SARAPU,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,269
KIRKE,SARAPU,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Women,2x30m,536
KIRKE,KAUKVERE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,251
KIRKE,KAUKVERE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,30m,197
KIRKE,KAUKVERE,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Women,2x30m,448
LEONEL,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,276
LEONEL,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,279
LEONEL,KÕLVALD,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,2x10m,555
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,248
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,270
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,2x10m,518
HUGO,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,207
HUGO,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,10m,154
HUGO,RIST,VVVK Vana-Võidu VK / Viljandi SK,10.05.2025,Puiatu Kevadnooled,Recreational Under 8 Boys,2x10m,361
`,
  '13_09_2025_Puiatu_CUP_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,318
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,293
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,611
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,314
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,313
MARTIN,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,627
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,315
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,288
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,603
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,295
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,280
TANEL,KAASIK,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,575
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,276
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,284
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,560
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,310
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,301
ARE,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,611
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,289
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,271
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,560
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,296
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,303
KAIT,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,599
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,266
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,290
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,556
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,290
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,288
HANNES,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,578
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,270
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,272
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,542
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,290
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,301
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,591
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,282
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,267
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,549
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,280
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,278
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,558
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,266
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,274
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,540
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,274
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,251
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,525
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,248
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,232
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,499
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,236
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,245
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,468
MARTIN,VIIRPALU,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,130
MARTIN,VIIRPALU,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,130
MARTIN,VIIRPALU,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,306
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,162
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,70m,151
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Men,2x70m,318
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,311
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,319
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,630
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,317
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,313
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,630
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,263
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,291
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,554
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,291
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,278
BIRGIT,METSJÕE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,569
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,263
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,274
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,537
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,275
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,281
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,556
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,265
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,261
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,526
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,296
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,268
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,564
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,245
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,259
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,504
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,271
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,247
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,518
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,254
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,254
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,508
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,244
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,249
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,493
TRIINU,RÕIGAS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,218
TRIINU,RÕIGAS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,70m,188
TRIINU,RÕIGAS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Women,2x70m,459
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,281
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,299
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,580
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,291
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,289
MARTEN,SUITS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,580
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,294
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,276
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,570
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,264
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,283
TARVET,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,547
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,226
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,247
PATRICK,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,487
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,181
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,70m,174
GERETH,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Men,2x70m,367
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,278
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,274
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,552
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,283
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,267
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,550
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,256
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,267
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,523
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,271
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,255
EMILI,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,526
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,255
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,265
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,520
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,264
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,246
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,510
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,217
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,254
MIREL,MISSIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,462
LIIS,KIRSCH,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,187
LIIS,KIRSCH,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,188
LIIS,KIRSCH,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,372
LUISA,KASUK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,134
LUISA,KASUK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,70m,150
LUISA,KASUK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 21 Women,2x70m,260
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,279
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,296
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,575
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,280
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,312
KAAREL,PILLART,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,592
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,286
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,296
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,582
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,292
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,289
MÄRT,LABI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,581
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,291
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,297
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,588
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,275
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,262
MARTEN,MÄGER,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,537
ARDO,OJAMETS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,249
ARDO,OJAMETS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,264
ARDO,OJAMETS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,480
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,180
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,221
KARL,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,381
UKU,RIISENBERG,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,117
UKU,RIISENBERG,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,60m,91
UKU,RIISENBERG,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Men,2x60m,217
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,308
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,308
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,616
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,323
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,310
EMMA,KASK,TVSK Tartu Valla Spordiklubi,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,633
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,304
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,295
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,599
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,314
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,309
INGRID ANNELORE,RITVAL,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,623
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,287
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,303
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,590
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,283
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,284
KAROLINE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,567
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,272
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,290
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,562
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,284
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,274
LISETE LAUREEN,LEPIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,558
SAIRE,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,136
SAIRE,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,60m,157
SAIRE,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 18 Women,2x60m,253
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,294
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,298
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,592
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,316
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,338
MÄRT,GROSS,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,654
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,268
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,245
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,513
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,317
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,304
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,621
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,261
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,260
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,521
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,295
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,280
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,575
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,272
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,239
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,511
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,289
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,291
OTTO,MIKKOR,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,580
SIIM OLIVER,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,152
SIIM OLIVER,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,284
SIIM OLIVER,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,380
KEIRO,MÄNNIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,50
KEIRO,MÄNNIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,40m,98
KEIRO,MÄNNIK,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Men,2x40m,103
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,293
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,277
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,2x40m,570
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,315
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,324
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,2x40m,639
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,249
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,234
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,2x40m,483
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,246
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,293
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,2x40m,539
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,198
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,40m,246
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 15 Women,2x40m,368
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,304
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,294
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,598
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,323
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,333
MATTIAS,KRAAV,THL Tähelend,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,656
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,298
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,293
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,591
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,327
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,331
RAIKO,LUIK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,658
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,295
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,239
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,534
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,317
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,314
ALBERT ALBUS,ILD,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,631
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,218
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,260
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,478
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,319
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,332
RASMUS,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,651
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,231
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,223
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,454
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,295
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,285
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,580
MATTHIAS,VESALAHTI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,124
MATTHIAS,VESALAHTI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,25m,270
MATTHIAS,VESALAHTI,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Men,2x25m,242
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,293
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,320
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,2x25m,613
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,345
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,344
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,2x25m,689
LIIS MIRELL,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,153
LIIS MIRELL,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,25m,264
LIIS MIRELL,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve Under 13 Women,2x25m,297
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,50m,331
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,50m,343
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,2x50m,674
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,50m,338
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,50m,317
AIVAR,PRUULI,BH Baltic Hunter SC,13.09.2025,Puiatu CUP 2025,Compound Men,2x50m,655
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,50m,321
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,50m,311
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,2x50m,632
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,50m,299
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,50m,289
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Men,2x50m,588
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,50m,339
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,50m,341
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,2x50m,680
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,50m,334
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,50m,331
KRISTI,ILVES,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Women,2x50m,665
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,329
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,315
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,2x50m,644
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,316
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,313
PAUL HENNING,HANNI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,2x50m,629
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,286
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,304
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,2x50m,590
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,301
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,50m,293
ANDRES,SARAPUU,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 21 Men,2x50m,594
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,326
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,326
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,2x50m,652
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,319
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,326
OSKAR,TOMINGAS,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,2x50m,645
GERT,SOE,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,226
GERT,SOE,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,50m,235
GERT,SOE,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Men,2x50m,462
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,324
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,311
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,2x50m,635
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,302
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,298
LIISE,KUUSK,TYRI Türi Vibukool,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,2x50m,600
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,266
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,296
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,2x50m,562
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,269
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,255
MERIBEL,SARV,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,2x50m,524
MARCELLA,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,252
MARCELLA,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,50m,242
MARCELLA,SOESOO,VVVK,13.09.2025,Puiatu CUP 2025,Compound Under 18 Women,2x50m,500
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,40m,285
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,40m,315
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,2x40m,600
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,40m,335
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,40m,345
MIIA,KERDE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound Under 15 Women,2x40m,680
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,290
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,299
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,2x50m,589
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,278
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,267
PAUL,VILLEMI,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Barebow Men,2x50m,545
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,259
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,275
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,2x50m,534
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,273
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,265
JAAN,RÖSLER,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,2x50m,538
KAIN,ILVES,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,175
KAIN,ILVES,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,50m,177
KAIN,ILVES,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Men,2x50m,334
KATRIN,PÕDRA,TVK Tartu Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,50m,245
KATRIN,PÕDRA,TVK Tartu Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,50m,216
KATRIN,PÕDRA,TVK Tartu Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,2x50m,465
KERSTI,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,50m,226
KERSTI,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,50m,194
KERSTI,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Barebow Women,2x50m,380
JÜRGEN,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Barebow Under 18 Men,40m,219
JÜRGEN,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Barebow Under 18 Men,40m,238
JÜRGEN,ELLAM,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Barebow Under 18 Men,2x40m,461
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,30m,216
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,30m,272
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,2x30m,488
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,30m,301
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,30m,313
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 15 Men,2x30m,614
KRISTIINA,KOPPEL,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 13 Women,20m,237
KRISTIINA,KOPPEL,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 13 Women,20m,264
KRISTIINA,KOPPEL,VVVK,13.09.2025,Puiatu CUP 2025,Barebow Under 13 Women,2x20m,449
KALJU,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Men,50m,175
KALJU,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Men,50m,175
KALJU,BAUMANN,SVK Saarde Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Men,2x50m,362
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,229
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,226
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,2x20m,455
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,292
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,294
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,2x20m,586
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,168
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,255
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,2x20m,310
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,118
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,20m,160
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Men,2x20m,231
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,20m,220
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,20m,238
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,2x20m,458
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,20m,302
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,20m,268
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 13 Women,2x20m,570
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,309
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,314
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,623
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,309
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,309
SEMEN,KIIAKH,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,618
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,287
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,256
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,543
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,290
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,289
KARL ROBIN,JÄRVE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,579
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,275
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,257
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,532
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,276
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,259
JAAN JAREK,ALLIK,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,535
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,233
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,249
ARSENII,KAPLUN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,492
VIKTOR,YEVCHYSHYN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,218
VIKTOR,YEVCHYSHYN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,258
VIKTOR,YEVCHYSHYN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,470
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,215
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,244
LENART,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,452
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,150
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,151
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,267
ANDRI,LEIMAN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,178
ANDRI,LEIMAN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,137
ANDRI,LEIMAN,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,331
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,84
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,105
HOLGER,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,229
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,32
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,30m,49
MORTEN,LILLEMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Men,2x30m,74
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,323
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,321
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,644
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,318
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,324
SANDRA,LÕOKE,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,642
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,292
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,293
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,585
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,295
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,324
LOVISA,LEMBER,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,619
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,299
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,292
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,591
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,284
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,303
HAIDI,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,587
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,281
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,261
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,542
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,286
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,276
STELLA,ÕISMAA,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,562
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,269
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,30m,219
KAROLIINA,HAUKANÕMM,VVVK,13.09.2025,Puiatu CUP 2025,Recreational Women,2x30m,485
INDREK,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,301
INDREK,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,310
INDREK,HIIE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,2x60m,611
TIIT,HEINSALU,SJK Suure-Jaani VK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,276
TIIT,HEINSALU,SJK Suure-Jaani VK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,281
TIIT,HEINSALU,SJK Suure-Jaani VK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,2x60m,557
PRIIT,PRAMANN,VVVK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,279
PRIIT,PRAMANN,VVVK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,60m,255
PRIIT,PRAMANN,VVVK,13.09.2025,Puiatu CUP 2025,Recurve 50+ Men,2x60m,534
EVE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve 50+ Women,60m,287
EVE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve 50+ Women,60m,282
EVE,KIVILO,JVI Järvakandi Ilves,13.09.2025,Puiatu CUP 2025,Recurve 50+ Women,2x60m,569
HUGO,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,296
HUGO,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,294
HUGO,RIST,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,2x10m,590
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,272
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,304
ERKI,PEIPS,VVVK,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,2x10m,576
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,268
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,10m,283
OSKAR MATHIAS,KUKK,PVM Pärnu Meelis,13.09.2025,Puiatu CUP 2025,Recurve Under 10 Men,2x10m,551
TARMO,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound 50+ Men,50m,281
TARMO,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound 50+ Men,50m,296
TARMO,KANAMÄE,SAG Sagittarius,13.09.2025,Puiatu CUP 2025,Compound 50+ Men,2x50m,577
VELLO,ROOVEER,VVVK,13.09.2025,Puiatu CUP 2025,Longbow 50+ Men,30m,243
VELLO,ROOVEER,VVVK,13.09.2025,Puiatu CUP 2025,Longbow 50+ Men,30m,261
VELLO,ROOVEER,VVVK,13.09.2025,Puiatu CUP 2025,Longbow 50+ Men,2x30m,504
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,13.09.2025,Puiatu CUP 2025,Longbow 50+ Women,30m,248
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,13.09.2025,Puiatu CUP 2025,Longbow 50+ Women,30m,262
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,13.09.2025,Puiatu CUP 2025,Longbow 50+ Women,2x30m,510
MARIETTE ELISE,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 10 Women,10m,187
MARIETTE ELISE,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 10 Women,10m,202
MARIETTE ELISE,MILLER,VMVK Vooremaa Vibuklubi,13.09.2025,Puiatu CUP 2025,Longbow Under 10 Women,2x10m,389
`,
  '15_09_2024_Puiatu_CUP.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
PRIIT,TANVEL,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,320
PRIIT,TANVEL,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,314
PRIIT,TANVEL,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,634
KAIT,SOESOO,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,307
KAIT,SOESOO,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,309
KAIT,SOESOO,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,616
TANEL,KAASIK,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,295
TANEL,KAASIK,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,307
TANEL,KAASIK,M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,602
MARTIN,RIST,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,304
MARTIN,RIST,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,297
MARTIN,RIST,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,601
ARE,LEMBER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,308
ARE,LEMBER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,286
ARE,LEMBER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,594
MIKK,MIHKELSON,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,287
MIKK,MIHKELSON,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,281
MIKK,MIHKELSON,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,568
HANNES,KRAAV,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,283
HANNES,KRAAV,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,276
HANNES,KRAAV,M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,559
TARVET,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,289
TARVET,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,264
TARVET,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,553
JANEK,TOLBERG,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,273
JANEK,TOLBERG,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,280
JANEK,TOLBERG,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,553
PATRICK,JÄRVE,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,255
PATRICK,JÄRVE,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,266
PATRICK,JÄRVE,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,521
TIIT,HEINSALU,M SJK Suure-Jaani Vibuklubi,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,235
TIIT,HEINSALU,M SJK Suure-Jaani Vibuklubi,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,264
TIIT,HEINSALU,M SJK Suure-Jaani Vibuklubi,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,499
ANDRES,SARAPUU,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,242
ANDRES,SARAPUU,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,239
ANDRES,SARAPUU,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,481
ANDREY,GERASSIMOV,M SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,239
ANDREY,GERASSIMOV,M SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,216
ANDREY,GERASSIMOV,M SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,455
PRIIT,PRAMANN,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,216
PRIIT,PRAMANN,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,217
PRIIT,PRAMANN,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,433
MÄRT,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,152
MÄRT,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,173
MÄRT,LABI,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,325
MAIK,BILITJUK,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,135
MAIK,BILITJUK,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,70m,173
MAIK,BILITJUK,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Mehed,2x70m,308
EMMA,KASK,W TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,301
EMMA,KASK,W TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,297
EMMA,KASK,W TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,598
BESSI,KASAK,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,290
BESSI,KASAK,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,303
BESSI,KASAK,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,593
MARIELLE,LAASMA,W PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,296
MARIELLE,LAASMA,W PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,272
MARIELLE,LAASMA,W PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,568
BIRGIT,METSJÕE,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,282
BIRGIT,METSJÕE,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,275
BIRGIT,METSJÕE,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,557
TRIINU,LILIENTHAL,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,272
TRIINU,LILIENTHAL,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,259
TRIINU,LILIENTHAL,W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,531
JAANIKA,RÖSLER,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,268
JAANIKA,RÖSLER,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,260
JAANIKA,RÖSLER,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,528
MIREL,MISSIK,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,257
MIREL,MISSIK,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,226
MIREL,MISSIK,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,483
INGRID ANNALORE,RITVAL,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,216
INGRID ANNALORE,RITVAL,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,227
INGRID ANNALORE,RITVAL,W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,443
KARMEL,UUSELU,W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,194
KARMEL,UUSELU,W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Naised,70m,207
KARMEL,UUSELU,W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Naised,2x70m,401
EVE,KIVILO,50W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,60m,257
EVE,KIVILO,50W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,60m,263
EVE,KIVILO,50W JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x60m,520
TARVET,LABI,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,297
TARVET,LABI,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,289
TARVET,LABI,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x70m,586
ERKI,ÜTSMÜTS,U21M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,260
ERKI,ÜTSMÜTS,U21M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,272
ERKI,ÜTSMÜTS,U21M JVI Järvakandi Vibuklubi Ilves,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x70m,532
ANDRES,SARAPUU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,261
ANDRES,SARAPUU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,238
ANDRES,SARAPUU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x70m,499
ANNE,SEIN,U21W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,295
ANNE,SEIN,U21W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,298
ANNE,SEIN,U21W SAG Sagittarius,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x70m,593
BIRGIT,METSJÕE,U21W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,288
BIRGIT,METSJÕE,U21W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,70m,277
BIRGIT,METSJÕE,U21W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Sportvibu Veteranid Naised,2x70m,565
EVERT,RESSAR,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,350
EVERT,RESSAR,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,343
EVERT,RESSAR,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,2x50m,693
MAIT,SIREL,M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,340
MAIT,SIREL,M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,323
MAIT,SIREL,M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Mehed,2x50m,663
AIVAR,PRUULI,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,322
AIVAR,PRUULI,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,50m,333
AIVAR,PRUULI,M BH Baltic Hunter SC,15.09.2024,Puiatu CUP,Plokkvibu Mehed,2x50m,655
TARMO,KANAMÄE,50M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,294
TARMO,KANAMÄE,50M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,303
TARMO,KANAMÄE,50M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,597
PAUL HENNING,HANNI,U21M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,313
PAUL HENNING,HANNI,U21M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,288
PAUL HENNING,HANNI,U21M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,601
MAIT,SIREL,U18M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,327
MAIT,SIREL,U18M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,335
MAIT,SIREL,U18M PVM Pärnu Meelis,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,662
AKSEL,TÄHEPÕLD,U18M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,314
AKSEL,TÄHEPÕLD,U18M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,321
AKSEL,TÄHEPÕLD,U18M SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,635
KARL,ÕISMAA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,211
KARL,ÕISMAA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,168
KARL,ÕISMAA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,379
GERT,SOE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,108
GERT,SOE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,149
GERT,SOE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,257
DAGNE,ORIEHOV,U18W SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,312
DAGNE,ORIEHOV,U18W SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,315
DAGNE,ORIEHOV,U18W SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,627
MARCELLA,SOESOO,U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,187
MARCELLA,SOESOO,U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,168
MARCELLA,SOESOO,U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,355
KEIRA,TENNO,A.E. U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,183
KEIRA,TENNO,A.E. U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,50m,161
KEIRA,TENNO,A.E. U18W VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x50m,344
GREGOR,ORIEHOV,U15M SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,30m,344
GREGOR,ORIEHOV,U15M SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,30m,346
GREGOR,ORIEHOV,U15M SVK Saarde Vibuklubi,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x30m,690
MIIA,KERDE,U15W SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,30m,347
MIIA,KERDE,U15W SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,30m,340
MIIA,KERDE,U15W SAG Sagittarius,15.09.2024,Puiatu CUP,Plokkvibu Veteranid Mehed,2x30m,687
JAAN,RÖSLER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Mehed,50m,293
JAAN,RÖSLER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Mehed,50m,288
JAAN,RÖSLER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Mehed,2x50m,581
KERSTI,BAUMANN,W LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Vaistuvibu Naised,50m,224
KERSTI,BAUMANN,W LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Vaistuvibu Naised,50m,240
KERSTI,BAUMANN,W LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x50m,464
KAIN,ILVES,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,215
KAIN,ILVES,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,212
KAIN,ILVES,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x30m,427
MARTIN,VIIRPALU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,100
MARTIN,VIIRPALU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,96
MARTIN,VIIRPALU,U21M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x30m,196
OLIVER ALEKS,TRIPPEL,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,201
OLIVER ALEKS,TRIPPEL,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,227
OLIVER ALEKS,TRIPPEL,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x30m,428
KARL ROBIN,JÄRVE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,209
KARL ROBIN,JÄRVE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,186
KARL ROBIN,JÄRVE,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x30m,395
SIMONA,JERMANN,U18W SAG Sagittarius,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,233
SIMONA,JERMANN,U18W SAG Sagittarius,15.09.2024,Puiatu CUP,Vaistuvibu Naised,30m,230
SIMONA,JERMANN,U18W SAG Sagittarius,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x30m,463
ARSENII,KAPLUN,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,15m,298
ARSENII,KAPLUN,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,15m,291
ARSENII,KAPLUN,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Vaistuvibu Naised,2x15m,589
MEELIS,PÄLLO,M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,225
MEELIS,PÄLLO,M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,216
MEELIS,PÄLLO,M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Mehed,2x50m,441
KALJU,BAUMANN,M LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,207
KALJU,BAUMANN,M LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,175
KALJU,BAUMANN,M LVL Lääne Vibulaskjad,15.09.2024,Puiatu CUP,Pikkvibu Mehed,2x50m,382
VELLO,ROOVEER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,103
VELLO,ROOVEER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Mehed,50m,186
VELLO,ROOVEER,M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Mehed,2x50m,289
ENN,SALU,50M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Mehed,30m,268
ENN,SALU,50M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Mehed,30m,253
ENN,SALU,50M VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Mehed,2x30m,521
PILLERIIN,JÄRVE,50W KSK Kajamaa Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,238
PILLERIIN,JÄRVE,50W KSK Kajamaa Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,253
PILLERIIN,JÄRVE,50W KSK Kajamaa Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,491
MARJU-LY,KAARJÄRV,50W VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,231
MARJU-LY,KAARJÄRV,50W VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,212
MARJU-LY,KAARJÄRV,50W VMV Vooremaa Vibuklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,443
MAKSYM,ROSSOKHA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,234
MAKSYM,ROSSOKHA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,193
MAKSYM,ROSSOKHA,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,427
ANDRI,LEIMAN,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,136
ANDRI,LEIMAN,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,104
ANDRI,LEIMAN,U18M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,240
OLIVER,KÄNDMA,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,15m,290
OLIVER,KÄNDMA,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,15m,279
OLIVER,KÄNDMA,U13M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x15m,569
SEBASTIAN,ZIMMER,U13M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,15m,276
SEBASTIAN,ZIMMER,U13M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,15m,270
SEBASTIAN,ZIMMER,U13M TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x15m,546
LENART,LEMBER,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,318
LENART,LEMBER,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,322
LENART,LEMBER,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x10m,640
ERKI,PEIPS,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,294
ERKI,PEIPS,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,300
ERKI,PEIPS,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x10m,594
HUGO,RIST,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,234
HUGO,RIST,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,10m,262
HUGO,RIST,U8M VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x10m,496
ARGO,SEPP,HM TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,320
ARGO,SEPP,HM TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,321
ARGO,SEPP,HM TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,641
NAZAR,KVASHUK,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,305
NAZAR,KVASHUK,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,306
NAZAR,KVASHUK,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,611
OTTO,MIKKOR,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,265
OTTO,MIKKOR,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,242
OTTO,MIKKOR,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,507
UKU,RIISENBERG,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,243
UKU,RIISENBERG,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,256
UKU,RIISENBERG,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,499
MAKSYM,ROSSOKHA,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,203
MAKSYM,ROSSOKHA,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,207
MAKSYM,ROSSOKHA,HM VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,410
EVA-MARIA,VINKEL,HW TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,317
EVA-MARIA,VINKEL,HW TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,332
EVA-MARIA,VINKEL,HW TLVK Tallinna Vibukool,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,649
SANDRA,LÕOKE,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,319
SANDRA,LÕOKE,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,317
SANDRA,LÕOKE,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,636
STELLA,ÕISMAA,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,291
STELLA,ÕISMAA,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,290
STELLA,ÕISMAA,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,581
ANNIKA,VÄNT,HW TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,279
ANNIKA,VÄNT,HW TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,295
ANNIKA,VÄNT,HW TVSK Tartu Valla Spordiklubi,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,574
TRIINU,RÕIGAS,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,280
TRIINU,RÕIGAS,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,280
TRIINU,RÕIGAS,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,560
KAROLIINA,HAUKANÕMM,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,191
KAROLIINA,HAUKANÕMM,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,228
KAROLIINA,HAUKANÕMM,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,419
LOVISA,LEMBER,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,200
LOVISA,LEMBER,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,30m,200
LOVISA,LEMBER,HW VVVK Vana-Võidu VK/Viljandi SK,15.09.2024,Puiatu CUP,Pikkvibu Veteranid Naised,2x30m,400
`,
  '16_08_2025_XV_Aksel_Randmeri_Memoriaal_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,297
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,290
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,2x70m,587
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,294
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,267
GLEB,KONONOVS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,2x70m,561
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,276
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,275
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,2x70m,551
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,279
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,70m,271
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Men,2x70m,550
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,322
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,315
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,637
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,303
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,312
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,615
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,301
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,299
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,600
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,287
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,288
IEVA,MELLE,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,575
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,297
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,299
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,596
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,295
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,283
JELENA,KONONOVA,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,578
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,307
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,278
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,585
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,249
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,269
KAROLI,LUIGE,NS NS Archery Club,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,518
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,263
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,273
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,536
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,274
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,258
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,532
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,264
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,264
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,528
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,263
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,272
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,535
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,188
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,209
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,397
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,213
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,165
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,378
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,177
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,190
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,367
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,202
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,70m,202
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Women,2x70m,404
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,267
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,273
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,540
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,279
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,278
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,557
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,237
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,267
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,504
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,270
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,266
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,536
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,219
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,255
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,474
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,250
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,70m,224
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Men,2x70m,474
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,248
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,236
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,2x70m,484
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,263
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,257
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,2x70m,520
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,66
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,73
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,2x70m,139
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,51
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,70m,80
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 21 Women,2x70m,131
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,60m,278
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,60m,287
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,2x60m,565
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,60m,303
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,60m,302
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Men,2x60m,605
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,329
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,324
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,653
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,324
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,293
EMMA,KASK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,617
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,290
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,279
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,569
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,274
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,283
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,557
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,267
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,273
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,540
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,269
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,288
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,557
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,172
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,174
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,346
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,164
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,60m,170
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 18 Women,2x60m,334
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,333
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,319
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,652
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,333
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,319
KRENT,KAASIK,TVSK Tvsk,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,652
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,288
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,298
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,586
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,295
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,306
OTTO,MIKKOR,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,601
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,288
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,291
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,579
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,280
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,269
JAAN JAREK,ALLIK,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,549
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,295
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,288
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,583
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,253
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,30m,266
BRONEK,IBRUS,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Men,2x30m,519
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,291
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,307
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,598
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,300
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,291
SANDRA,LÕOKE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,591
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,294
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,288
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,582
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,280
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,311
STELLA,ÕISMAA,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,591
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,262
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,271
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,533
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,263
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,30m,258
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 15 Women,2x30m,521
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,60m,255
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,60m,220
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,2x60m,475
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,60m,248
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,60m,215
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve 50+ Men,2x60m,463
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,316
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,323
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,639
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,332
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,321
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,653
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,301
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,324
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,625
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,321
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,336
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,657
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,300
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,323
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,623
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,324
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,306
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,630
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,313
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,305
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,618
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,281
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,15m,266
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Men,2x15m,547
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,15m,341
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,15m,345
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,2x15m,686
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,15m,353
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,15m,345
LOVISA,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Recurve Under 13 Women,2x15m,698
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,346
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,342
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,2x50m,688
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,343
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,339
EVERT,RESSAR,BH BalticHunter SC,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,2x50m,682
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,339
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,339
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,2x50m,678
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,331
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,50m,336
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Men,2x50m,667
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,349
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,343
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,2x50m,692
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,342
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,340
MARIS,TETSMANN,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,2x50m,682
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,329
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,337
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,2x50m,666
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,339
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,50m,324
JULIJA,OLEKSEJENKO,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Women,2x50m,663
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,323
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,320
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,2x50m,643
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,315
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,320
DAGNE,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,2x50m,635
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,312
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,303
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,2x50m,615
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,309
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,50m,293
LIISE,KUUSK,TYRI Türi Vibukool,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 21 Women,2x50m,602
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,327
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,328
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,2x50m,655
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,327
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,330
GREGOR,ORIEHOV,SVK Vibuklubi Saarde,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,2x50m,657
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,170
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,236
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,2x50m,406
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,257
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,50m,271
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Men,2x50m,528
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,50m,211
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,50m,194
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,2x50m,405
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,50m,234
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,50m,146
KEIRA ALLEGRA ELIISE,TENNO,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Under 18 Women,2x50m,380
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,286
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,269
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,555
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,284
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,268
TOMS,JANKOVSKIS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,552
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,228
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,196
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,424
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,195
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,199
ARTURS,STRADS,AMA Amazones,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,394
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,39
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,0
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,39
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,0
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,50m,0
MARTIN,MADISSON,PVM Pärnu Vibuklubi Meelis,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Compound Wheelchair 1 Men,2x50m,0
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,30m,232
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,30m,259
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,2x30m,491
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,30m,218
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,30m,238
JÜRGEN,ELLAM,JVI Järvakandi Vibuklubi Ilves,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 18 Men,2x30m,456
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,15m,217
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,15m,250
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,2x15m,467
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,15m,250
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,15m,247
KRISTIINA,KOPPEL,VILJ Vana-Võidu Vibuklubi/Viljandi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Barebow Under 13 Women,2x15m,497
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,15m,230
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,15m,261
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,2x15m,491
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,15m,260
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,15m,267
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,16.08.2025,XV Aksel Randmeri Memoriaal 2025,Longbow Under 13 Women,2x15m,527
`,
  '19_07_2025_Eesti_Meistrivõistlused_OR_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
MARTIN,RIST,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,315
MARTIN,RIST,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,321
MARTIN,RIST,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,636
PRIIT,TANVEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,305
PRIIT,TANVEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,305
PRIIT,TANVEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,610
KAIT,SOESOO,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,295
KAIT,SOESOO,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,304
KAIT,SOESOO,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,599
TANEL,KAASIK,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,302
TANEL,KAASIK,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,295
TANEL,KAASIK,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,597
RASMUS,KÄSPER,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,296
RASMUS,KÄSPER,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,292
RASMUS,KÄSPER,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,588
HANNES,KRAAV,TL TäheLend,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,291
HANNES,KRAAV,TL TäheLend,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,289
HANNES,KRAAV,TL TäheLend,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,580
MARTEN,SUITS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,287
MARTEN,SUITS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,282
MARTEN,SUITS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,569
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,281
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,284
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,565
ALO,NURMSALU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,269
ALO,NURMSALU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,291
ALO,NURMSALU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,560
MÄRT,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,270
MÄRT,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,286
MÄRT,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,556
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,282
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,271
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,553
HELDUR,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,271
HELDUR,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,282
HELDUR,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,553
KAAREL,PILLART,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,276
KAAREL,PILLART,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,271
KAAREL,PILLART,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,547
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,272
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,267
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,539
ARE,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,254
ARE,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,282
ARE,LEMBER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,536
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,267
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,263
PATRICK,JÄRVE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,530
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,270
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,256
TARVET,LABI,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,526
RAIT,OTS,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,262
RAIT,OTS,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,264
RAIT,OTS,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,526
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,275
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,248
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,523
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,251
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,264
ANDRES,SARAPUU,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,515
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,245
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,265
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,510
JANEK,TOLBERG,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,252
JANEK,TOLBERG,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,258
JANEK,TOLBERG,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,510
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,234
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,258
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,492
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,216
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,70m,225
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Men,2x70m,441
EMMA,KASK,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,286
EMMA,KASK,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,285
EMMA,KASK,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,571
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,266
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,282
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,548
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,285
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,260
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,545
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,257
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,285
BIRGIT,METSJÕE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,542
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,272
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,249
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,521
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,257
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,260
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,517
JAANIKA,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,259
JAANIKA,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,258
JAANIKA,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,517
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,257
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,256
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,513
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,281
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,229
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,510
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,255
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,246
MIREL,MISSIK,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,501
EMILI,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,244
EMILI,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,242
EMILI,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,486
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,220
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,253
TESSA CATHLEN,TAMMIK,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,473
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,227
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,235
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,462
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,249
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,207
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,456
MARET,TAMME,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,179
MARET,TAMME,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,183
MARET,TAMME,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,362
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,159
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,144
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,303
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,140
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,70m,149
TRIINU,RÕIGAS,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve Women,2x70m,289
INDREK,HIIE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,284
INDREK,HIIE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,308
INDREK,HIIE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,2x60m,592
PRIIT,PRAMANN,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,255
PRIIT,PRAMANN,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,255
PRIIT,PRAMANN,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,2x60m,510
ANDREY,GERASSIMOV,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,221
ANDREY,GERASSIMOV,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,60m,256
ANDREY,GERASSIMOV,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 50+ Men,2x60m,477
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,60m,267
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,60m,252
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,2x60m,519
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,60m,255
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,60m,209
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Men,2x60m,464
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Women,60m,243
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Women,60m,240
EVE,KIVILO,JVI Järvakandi Vibuklubi Ilves,19.07.2025,Eesti Meistrivõistlused OR 2025,Recurve 60+ Women,2x60m,483
EVERT,RESSAR,BH Baltic Hunter SC,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,344
EVERT,RESSAR,BH Baltic Hunter SC,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,350
EVERT,RESSAR,BH Baltic Hunter SC,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,694
CAIUS,KAND,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,336
CAIUS,KAND,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,342
CAIUS,KAND,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,678
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,337
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,335
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,672
AKSEL,TÄHEPÕLD,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,316
AKSEL,TÄHEPÕLD,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,321
AKSEL,TÄHEPÕLD,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,637
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,314
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,318
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,632
PAUL HENNING,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,310
PAUL HENNING,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,300
PAUL HENNING,HANNI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,610
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,246
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,50m,244
GERT,SOE,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Men,2x50m,490
MEERI-MARITA,PAAS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,346
MEERI-MARITA,PAAS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,349
MEERI-MARITA,PAAS,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,2x50m,695
KRISTI,ILVES,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,336
KRISTI,ILVES,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,336
KRISTI,ILVES,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,2x50m,672
LIISE,KUUSK,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,291
LIISE,KUUSK,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,50m,304
LIISE,KUUSK,TYRI Türi Vibukool,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound Women,2x50m,595
TARMO,KANAMÄE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound 50+ Men,50m,306
TARMO,KANAMÄE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound 50+ Men,50m,304
TARMO,KANAMÄE,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Compound 50+ Men,2x50m,610
JAAN,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,262
JAAN,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,259
JAAN,RÖSLER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,2x50m,521
PAUL,VILLEMI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,256
PAUL,VILLEMI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,242
PAUL,VILLEMI,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,2x50m,498
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,251
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,231
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,2x50m,482
KALJU,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,215
KALJU,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,207
KALJU,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,2x50m,422
KAIN,ILVES,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,212
KAIN,ILVES,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,50m,167
KAIN,ILVES,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Men,2x50m,379
KRISTA,HEIN,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,256
KRISTA,HEIN,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,265
KRISTA,HEIN,SAG Sagittarius,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,2x50m,521
KERSTI,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,217
KERSTI,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,192
KERSTI,BAUMANN,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,2x50m,409
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,216
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,50m,178
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Barebow Women,2x50m,394
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,30m,234
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,30m,243
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,2x30m,477
KAJA,LOOT,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,30m,233
KAJA,LOOT,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,30m,212
KAJA,LOOT,SVK Vibuklubi Saarde,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 50+ Women,2x30m,445
VELLO,ROOVEER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Men,30m,278
VELLO,ROOVEER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Men,30m,280
VELLO,ROOVEER,VILJ Vana-Võidu Vibuklubi/Viljandi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Men,2x30m,558
ÜLLE,KELL,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Women,30m,304
ÜLLE,KELL,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Women,30m,320
ÜLLE,KELL,KSK Kajamaa Spordiklubi,19.07.2025,Eesti Meistrivõistlused OR 2025,Longbow 60+ Women,2x30m,624
`,
  '21_06_2025_Pärnu_Lahtised_Meistrivõistlused_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,297
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,311
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,608
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,291
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,290
KAIT,SOESOO,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,581
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,285
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,295
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,580
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,298
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,297
HANNES,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,595
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,281
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,277
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,558
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,286
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,248
EIMAR,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,534
ANDREY,GERASSIMOV,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,238
ANDREY,GERASSIMOV,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,70m,220
ANDREY,GERASSIMOV,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Men,2x70m,486
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,240
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,268
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,508
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,291
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,272
MARIELLE,LAASMA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,563
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,274
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,260
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,534
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,266
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,261
BIRGIT,METSJÕE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,527
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,266
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,209
REESI,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,476
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,225
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,70m,162
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Women,2x70m,405
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,270
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,274
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,2x70m,544
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,256
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,269
PATRICK,JÄRVE,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,2x70m,525
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,246
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,70m,235
TARVET,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Men,2x70m,486
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,280
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,289
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,2x70m,569
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,269
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,282
ANNE,SEIN,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,2x70m,551
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,56
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,99
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,2x70m,146
EMILI,HANNI,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,0
EMILI,HANNI,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,70m,0
EMILI,HANNI,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 21 Women,2x70m,0
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,285
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,267
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,552
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,274
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,283
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,557
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,249
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,254
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,503
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,280
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,266
MARTEN,MÄGER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,546
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,256
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,238
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,494
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,259
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,60m,273
MÄRT,LABI,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Men,2x60m,532
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,293
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,303
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,596
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,302
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,290
INGRID ANNELORE,RITVAL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,592
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,242
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,247
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,489
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,254
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,262
LISETE LAUREEN,LEPIK,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,516
LISETE,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,273
LISETE,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,209
LISETE,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,528
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,240
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,212
STELLA,VOLMER,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,467
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,209
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,60m,218
GERTRUD,VAENO,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 18 Women,2x60m,421
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,339
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,326
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,2x30m,665
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,329
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,311
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,2x30m,640
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,325
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,309
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,2x30m,634
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,305
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,30m,310
MATTIAS,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Men,2x30m,615
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,320
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,318
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,2x30m,638
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,317
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,314
KAISA,KRAAV,TL TäheLend,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,2x30m,631
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,276
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,262
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,2x30m,538
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,255
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,30m,229
KAROLIINA,HAUKANÕMM,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 15 Women,2x30m,484
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,282
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,275
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,2x60m,557
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,271
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,250
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,2x60m,521
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,262
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,259
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,2x60m,521
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,256
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,233
PRIIT,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,2x60m,489
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,196
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,60m,240
RAOUL,JOHANSON,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 50+ Men,2x60m,459
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,330
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,326
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,656
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,329
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,337
RASMUS,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,666
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,325
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,331
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,656
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,339
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,321
RAIKO,LUIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,660
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,295
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,307
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,602
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,312
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,312
MAREK,PILLMAA,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,624
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,301
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,290
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,591
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,309
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,322
ARTUR,PRAMANN,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,631
OSKAR MATHIAS,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,261
OSKAR MATHIAS,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,15m,252
OSKAR MATHIAS,KUKK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Men,2x15m,510
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,343
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,336
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,2x15m,679
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,345
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,338
LENNELY,SÄLIK,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,2x15m,683
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,335
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,341
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,2x15m,676
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,337
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,15m,344
ELIISE MARIE,KALDA,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve Under 13 Women,2x15m,681
JÜRGEN,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Men,30m,229
JÜRGEN,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Men,30m,204
JÜRGEN,ELLAM,JVI JVK Ilves,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Men,2x30m,392
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,284
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,308
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,592
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,316
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,312
ADRIANA,MASS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,628
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,285
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,293
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,578
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,299
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,300
HAIDI,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,599
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,288
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,302
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,590
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,276
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,274
TRIINU,RÕIGAS,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,550
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,267
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,300
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,567
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,296
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,30m,274
KIRKE,SARAPU,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Recurve 30 Women,2x30m,570
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,348
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,349
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,697
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,352
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,351
DAVID,PASQUALUCCI,AM Aeronautica Militare,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,703
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,340
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,351
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,691
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,330
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,345
EVERT,RESSAR,BH BalticHunter SC,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,675
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,332
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,337
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,669
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,340
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,50m,338
MAIT,SIREL,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Men,2x50m,678
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,50m,346
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,50m,352
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,2x50m,698
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,50m,351
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,50m,346
MEERI-MARITA,PAAS,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Women,2x50m,697
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,50m,336
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,50m,298
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,2x50m,634
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,50m,313
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,50m,321
OSKAR,TOMINGAS,PVM Pärnu Vibuklubi Meelis,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Men,2x50m,634
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,50m,305
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,50m,299
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,2x50m,604
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,50m,263
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,50m,269
LIISE,KUUSK,TYRI Türi Vibulool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 18 Women,2x50m,532
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,348
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,347
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,2x30m,695
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,345
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,348
MIIA,KERDE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,2x30m,693
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,344
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,352
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,2x30m,696
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,340
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,30m,345
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound Under 15 Women,2x30m,685
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,298
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,303
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,2x50m,601
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,304
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,297
TARMO,KANAMÄE,SAG Sagittarius,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,2x50m,601
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,279
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,250
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,2x50m,529
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,259
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,50m,271
AIGARS,KALNINS,ODI Odisejs,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Compound 50+ Men,2x50m,530
KALJU,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Men,50m,222
KALJU,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Men,50m,225
KALJU,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Men,2x50m,438
KERSTI,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Women,50m,230
KERSTI,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Women,50m,212
KERSTI,BAUMANN,SVK Vibuklubi Saarde,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Women,2x50m,463
ANDRO,RAUKAS,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 21 Men,30m,122
ANDRO,RAUKAS,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 21 Men,30m,131
ANDRO,RAUKAS,TLVK Tallinna Vibukool,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 21 Men,2x30m,327
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 13 Women,15m,226
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 13 Women,15m,185
KRISTIINA,KOPPEL,VILJ Vana-Võidu VK / Viljandi SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Barebow Under 13 Women,2x15m,414
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,30m,295
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,30m,301
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,2x30m,596
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,30m,287
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,30m,302
HEINO,TENNER,KSK Kajamaa SK,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow 50+ Men,2x30m,589
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,15m,264
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,15m,254
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,2x15m,518
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,15m,240
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,15m,264
MARIANN ELERI,MILLER,VVK Vooremaa Vibuklubi,21.06.2025,Pärnu Lahtised Meistrivõistlused 2025,Longbow Under 13 Women,2x15m,504
`,
  '22_03_2025_Eesti_sisemeistrivõistlused_2025.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,275
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,286
KAIT,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,561
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,283
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,274
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,557
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,277
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,278
MARTIN,RIST,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,555
ALO,NURMSALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,276
ALO,NURMSALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,273
ALO,NURMSALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,549
RAIT,OTS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,271
RAIT,OTS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,273
RAIT,OTS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,544
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,271
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,265
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,536
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,264
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,269
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,533
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,250
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,281
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,531
HANNES,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,261
HANNES,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,267
HANNES,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,528
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,257
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,264
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,521
KARL,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,272
KARL,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,242
KARL,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,514
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,263
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,244
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,507
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,256
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,246
ARE,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,502
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,242
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,241
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,483
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,228
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,245
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,473
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,229
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,236
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,465
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,216
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,18m,223
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Men,2x18m,439
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,287
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,273
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,560
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,279
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,279
TRIINU,LILIENTHAL,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,558
KAROLI,LUIGE,NS NS Archery Club,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,270
KAROLI,LUIGE,NS NS Archery Club,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,271
KAROLI,LUIGE,NS NS Archery Club,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,541
JAANIKA,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,274
JAANIKA,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,263
JAANIKA,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,537
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,269
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,265
BIRGIT,METSJÕE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,534
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,260
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,252
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,512
MARIELLE,LAASMA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,249
MARIELLE,LAASMA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,262
MARIELLE,LAASMA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,511
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,259
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,234
EVA-MARIA,VINKEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,493
TESSA CATHLEN,TAMMIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,245
TESSA CATHLEN,TAMMIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,239
TESSA CATHLEN,TAMMIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,484
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,257
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,226
HELERI,NÕMM,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,483
REESI,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,218
REESI,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,227
REESI,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,445
EPP MARII,PUKSMANN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,216
EPP MARII,PUKSMANN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,209
EPP MARII,PUKSMANN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,425
KARMEL,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,182
KARMEL,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,235
KARMEL,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,417
MARET,TAMME,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,219
MARET,TAMME,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,187
MARET,TAMME,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,406
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,206
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,186
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,392
TRIINU,RÕIGAS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,201
TRIINU,RÕIGAS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,18m,175
TRIINU,RÕIGAS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Women,2x18m,376
RAOUL,JOHANSON,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,233
RAOUL,JOHANSON,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,241
RAOUL,JOHANSON,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,2x18m,474
TIIT,HEINSALU,SJK Suure-Jaani VK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,214
TIIT,HEINSALU,SJK Suure-Jaani VK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,213
TIIT,HEINSALU,SJK Suure-Jaani VK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,2x18m,427
VIKTOR,PALMET,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,196
VIKTOR,PALMET,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,18m,187
VIKTOR,PALMET,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Men,2x18m,383
EVE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Women,18m,258
EVE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Women,18m,270
EVE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 60+ Women,2x18m,528
JAANUS,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,280
JAANUS,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,279
JAANUS,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,2x18m,559
TANEL,KAASIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,276
TANEL,KAASIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,267
TANEL,KAASIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,2x18m,543
KALLE,KIRNMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,265
KALLE,KIRNMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,269
KALLE,KIRNMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,2x18m,534
PRIIT,PRAMANN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,222
PRIIT,PRAMANN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,18m,206
PRIIT,PRAMANN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve 50+ Men,2x18m,428
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,278
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,264
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,542
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,265
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,267
RASMUS MIHKEL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,532
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,242
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,260
TARVET,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,502
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,251
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,251
RICHARD,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,502
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,242
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,255
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,497
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,252
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,232
GERETH,SOESOO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,484
MAVERIK,VALEND,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,218
MAVERIK,VALEND,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,229
MAVERIK,VALEND,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,447
HEINRICH,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,169
HEINRICH,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,18m,143
HEINRICH,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Men,2x18m,312
ANNE,SEIN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,274
ANNE,SEIN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,276
ANNE,SEIN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,550
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,264
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,264
JOHANNA VIKTORIA,JÕE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,528
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,254
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,266
JETTE LEELE,JÕE,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,520
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,251
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,253
MIREL,MISSIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,504
KAROLIINA,KÜBAR,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,246
KAROLIINA,KÜBAR,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,256
KAROLIINA,KÜBAR,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,502
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,184
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,233
LAURA,SOOTNA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,417
EMILI,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,154
EMILI,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,18m,125
EMILI,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 21 Women,2x18m,279
MARTEN,SUITS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,293
MARTEN,SUITS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,292
MARTEN,SUITS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,585
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,291
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,287
ANDER,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,578
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,290
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,286
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,576
KAAREL,PILLART,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,286
KAAREL,PILLART,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,287
KAAREL,PILLART,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,573
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,283
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,284
MIKK,MIHKELSON,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,567
EGERT,PÄHKEL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,285
EGERT,PÄHKEL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,282
EGERT,PÄHKEL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,567
ARDO,OJAMETS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,290
ARDO,OJAMETS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,275
ARDO,OJAMETS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,565
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,282
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,272
ROBERT,KROON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,554
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,275
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,276
KERON,SAULUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,551
THOR MATTIAS,RAPP,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,273
THOR MATTIAS,RAPP,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,273
THOR MATTIAS,RAPP,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,546
MARTEN,MÄGER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,265
MARTEN,MÄGER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,278
MARTEN,MÄGER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,543
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,270
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,273
MÄRT,LABI,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,543
OSKAR,TÕNISSON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,248
OSKAR,TÕNISSON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,276
OSKAR,TÕNISSON,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,524
KARL,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,234
KARL,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,18m,190
KARL,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Men,2x18m,424
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,296
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,296
EMMA,KASK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,592
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,296
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,289
INGRID ANNELORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,585
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,291
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,286
LISETTE MARIE,GOLD,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,577
LIISE,RÄTSEP,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,287
LIISE,RÄTSEP,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,288
LIISE,RÄTSEP,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,575
STELLA,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,276
STELLA,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,283
STELLA,VOLMER,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,559
VELEIA,OVSIANYTSKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,277
VELEIA,OVSIANYTSKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,281
VELEIA,OVSIANYTSKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,558
LISETE,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,277
LISETE,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,279
LISETE,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,556
MIRTEL,LILLELEHT,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,277
MIRTEL,LILLELEHT,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,278
MIRTEL,LILLELEHT,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,555
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,280
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,265
BRIGITTA,PAABO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,545
GERTRUD,VAENO,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,276
GERTRUD,VAENO,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,268
GERTRUD,VAENO,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,544
MIIA MARTHA,LIMMER,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,278
MIIA MARTHA,LIMMER,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,262
MIIA MARTHA,LIMMER,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,540
RENATE,TREI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,270
RENATE,TREI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,263
RENATE,TREI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,533
SAIRE,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,248
SAIRE,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,256
SAIRE,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,504
KIRKE,SARAPU,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,247
KIRKE,SARAPU,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,246
KIRKE,SARAPU,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,493
LIIS,GRELLIER,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,236
LIIS,GRELLIER,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,18m,213
LIIS,GRELLIER,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 18 Women,2x18m,449
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,268
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,275
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,543
MÄRT,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,274
MÄRT,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,268
MÄRT,GROSS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,542
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,272
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,248
NAZAR,KVASHUK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,520
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,256
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,261
JAAN JAREK,ALLIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,517
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,251
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,264
OTTO,MIKKOR,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,515
NIKITA,SAZONOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,255
NIKITA,SAZONOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,254
NIKITA,SAZONOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,509
BRONEK,IBRUS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,260
BRONEK,IBRUS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,240
BRONEK,IBRUS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,500
SIIM OLIVER,HIIE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,245
SIIM OLIVER,HIIE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,238
SIIM OLIVER,HIIE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,483
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,160
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,15m,160
KEIRO,MÄNNIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Men,2x15m,320
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,293
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,284
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,577
KAROLINE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,284
KAROLINE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,291
KAROLINE,KIVILO,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,575
KAISA,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,281
KAISA,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,285
KAISA,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,566
EKATERINA,NOVIKOVA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,251
EKATERINA,NOVIKOVA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,261
EKATERINA,NOVIKOVA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,512
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,246
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,256
KAROLIINA,HAUKANÕMM,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,502
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,248
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,250
SANDRA,LÕOKE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,498
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,248
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,15m,249
STELLA,ÕISMAA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 15 Women,2x15m,497
MATTIAS,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,285
MATTIAS,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,284
MATTIAS,KRAAV,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,569
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,286
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,278
AIN MARKUS,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,564
EMIL JOHANNE,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,276
EMIL JOHANNE,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,279
EMIL JOHANNE,VÄLJA,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,555
RAIKO,LUIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,277
RAIKO,LUIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,277
RAIKO,LUIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,554
MARTEN,SOOVIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,273
MARTEN,SOOVIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,279
MARTEN,SOOVIK,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,552
JOONATAN,VAIKLO,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,257
JOONATAN,VAIKLO,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,275
JOONATAN,VAIKLO,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,532
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,259
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,250
LENART,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,509
MAREK,PILLMAA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,260
MAREK,PILLMAA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,15m,246
MAREK,PILLMAA,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Men,2x15m,506
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,283
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,282
LOVISA,LEMBER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,565
KARITA,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,281
KARITA,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,269
KARITA,UUSELU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,550
LENNELY,SÄLIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,261
LENNELY,SÄLIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,262
LENNELY,SÄLIK,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,523
ELISABETH,DEDERER,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,255
ELISABETH,DEDERER,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,260
ELISABETH,DEDERER,JVI Järvakandi Ilves,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,515
MILEENE,KÕLVALD,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,225
MILEENE,KÕLVALD,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,249
MILEENE,KÕLVALD,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,474
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,223
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,240
MARII,LEHTMETS,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,463
KAISA,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,231
KAISA,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,15m,218
KAISA,RITSO,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Recurve Under 13 Women,2x15m,449
ROBIN,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,298
ROBIN,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,297
ROBIN,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,595
EVERT,RESSAR,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,289
EVERT,RESSAR,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,287
EVERT,RESSAR,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,576
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,284
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,283
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,567
KRISTO,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,281
KRISTO,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,285
KRISTO,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,566
VIKTOR,LUTŠKA,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,282
VIKTOR,LUTŠKA,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,283
VIKTOR,LUTŠKA,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,565
KRISTJAN,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,283
KRISTJAN,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,281
KRISTJAN,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,564
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,280
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,280
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,560
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,280
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,279
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,559
MEHIS,ERENVERT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,283
MEHIS,ERENVERT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,276
MEHIS,ERENVERT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,559
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,273
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,280
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,553
JANEK,PENT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,277
JANEK,PENT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,273
JANEK,PENT,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,550
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,276
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,270
TAIVO,KOVALEVSKI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,546
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,262
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,18m,265
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Men,2x18m,527
MEERI-MARITA,PAAS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,295
MEERI-MARITA,PAAS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,288
MEERI-MARITA,PAAS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,583
LISELL,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,291
LISELL,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,292
LISELL,JÄÄTMA,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,583
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,284
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,276
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,560
KRISTI,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,276
KRISTI,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,283
KRISTI,ILVES,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,559
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,276
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,274
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,550
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,271
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,18m,268
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Women,2x18m,539
JAAN,KOOKLA,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 60+ Men,18m,277
JAAN,KOOKLA,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 60+ Men,18m,271
JAAN,KOOKLA,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 60+ Men,2x18m,548
MART,MARANDI,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,275
MART,MARANDI,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,284
MART,MARANDI,BH Baltic Hunter SC,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,2x18m,559
TARMO,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,273
TARMO,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,273
TARMO,KANAMÄE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,2x18m,546
JEVGENI,IKKO,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,263
JEVGENI,IKKO,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,18m,279
JEVGENI,IKKO,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Men,2x18m,542
EVELYN,RANG,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Women,18m,265
EVELYN,RANG,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Women,18m,272
EVELYN,RANG,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound 50+ Women,2x18m,537
AKSEL,TÄHEPÕLD,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,285
AKSEL,TÄHEPÕLD,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,286
AKSEL,TÄHEPÕLD,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,2x18m,571
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,275
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,279
SIIM OLIVER,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,2x18m,554
PAUL,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,261
PAUL,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,18m,238
PAUL,HANNI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Men,2x18m,499
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,276
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,282
AUREELIA,KASAR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,2x18m,558
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,273
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,277
MAARJA LIIS,RÜÜTEL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,2x18m,550
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,271
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,18m,275
DAGNE,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 21 Women,2x18m,546
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,294
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,289
MAIT,SIREL,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,583
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,291
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,292
JARKO,MÄRS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,583
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,287
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,290
KARL-ERIC,FATAL,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,577
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,283
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,271
OSKAR,TOMINGAS,PVM Pärnu Meelis,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,554
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,257
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,271
GERT,SOE,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,528
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,260
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,18m,263
TANEL,TÕNTS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Men,2x18m,523
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,277
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,277
LIISE,KUUSK,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,554
ADRIANA,VANAMB,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,271
ADRIANA,VANAMB,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,262
ADRIANA,VANAMB,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,533
MERIBEL,SARV,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,261
MERIBEL,SARV,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,260
MERIBEL,SARV,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,521
SANDRA,MASING,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,267
SANDRA,MASING,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,250
SANDRA,MASING,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,517
BRIANNA,KREIS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,238
BRIANNA,KREIS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,206
BRIANNA,KREIS,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,444
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,212
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,18m,185
KEIRA ALLEGRA ELIISE,TENNO,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 18 Women,2x18m,397
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Men,15m,300
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Men,15m,300
GREGOR,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Men,2x15m,600
MIIA,KERDE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,295
MIIA,KERDE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,296
MIIA,KERDE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,2x15m,591
TRIINU,LUUKAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,293
TRIINU,LUUKAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,289
TRIINU,LUUKAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,2x15m,582
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,289
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,290
MARIA-LIISA,MÄTTAS,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,2x15m,579
LUMILI,LAUR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,292
LUMILI,LAUR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,284
LUMILI,LAUR,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,2x15m,576
KAISA,KARU,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,274
KAISA,KARU,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,15m,284
KAISA,KARU,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 15 Women,2x15m,558
KARL MÄRTEN,AREN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,290
KARL MÄRTEN,AREN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,286
KARL MÄRTEN,AREN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,2x15m,576
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,293
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,270
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,2x15m,563
RAIMOND,SCHASMIN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,277
RAIMOND,SCHASMIN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,15m,266
RAIMOND,SCHASMIN,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Men,2x15m,543
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,15m,297
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,15m,291
VANESSA,VAGUL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,2x15m,588
HELENA,LINDER,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,15m,273
HELENA,LINDER,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,15m,292
HELENA,LINDER,TYRI Türi Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Compound Under 13 Women,2x15m,565
ARGO,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,248
ARGO,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,249
ARGO,SEPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,497
JAAN,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,246
JAAN,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,242
JAAN,RÖSLER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,488
URMAS,KIVIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,245
URMAS,KIVIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,222
URMAS,KIVIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,467
PAUL,VILLEMI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,235
PAUL,VILLEMI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,223
PAUL,VILLEMI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,458
HARRI,VERHO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,221
HARRI,VERHO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,225
HARRI,VERHO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,446
VAIDO,VALLI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,236
VAIDO,VALLI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,207
VAIDO,VALLI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,443
PRIIDU,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,217
PRIIDU,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,208
PRIIDU,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,425
KAIN,ILVES,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,187
KAIN,ILVES,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,172
KAIN,ILVES,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,359
VLADIMIR,MIRANKOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,184
VLADIMIR,MIRANKOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,167
VLADIMIR,MIRANKOV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,351
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,161
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,18m,160
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Men,2x18m,321
HEIN,KRISTA,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,252
HEIN,KRISTA,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,244
HEIN,KRISTA,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,496
TRIIN,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,219
TRIIN,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,227
TRIIN,KENT,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,446
TERJE,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,228
TERJE,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,215
TERJE,PAOMETS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,443
EGNE,MARMOR,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,202
EGNE,MARMOR,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,197
EGNE,MARMOR,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,399
ANNIKA,VÄNT,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,211
ANNIKA,VÄNT,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,184
ANNIKA,VÄNT,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,395
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,190
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,18m,196
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Women,2x18m,386
KALJU,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,18m,140
KALJU,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,18m,169
KALJU,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,2x18m,309
ANDREI,KUKUŠKIN,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,18m,130
ANDREI,KUKUŠKIN,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,18m,134
ANDREI,KUKUŠKIN,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Men,2x18m,264
IRINA,REKUN,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Women,18m,106
IRINA,REKUN,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Women,18m,104
IRINA,REKUN,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 60+ Women,2x18m,210
AARE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Men,18m,221
AARE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Men,18m,218
AARE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Men,2x18m,439
AIRE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,18m,220
AIRE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,18m,191
AIRE,LAUREN,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,2x18m,411
KERSTI,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,18m,171
KERSTI,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,18m,181
KERSTI,BAUMANN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow 50+ Women,2x18m,352
LARIONOV,DIMITRI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,218
LARIONOV,DIMITRI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,188
LARIONOV,DIMITRI,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,2x18m,406
ANDRO,RAUKAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,138
ANDRO,RAUKAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,107
ANDRO,RAUKAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,2x18m,245
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,136
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,109
KRISTOFER,JUURSALU,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,2x18m,245
KAAREL,KANNUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,61
KAAREL,KANNUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,85
KAAREL,KANNUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,2x18m,146
MARTIN,VIIRPALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,8
MARTIN,VIIRPALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,18m,32
MARTIN,VIIRPALU,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Men,2x18m,40
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,146
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,147
NOORA,SIPRIA,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,2x18m,293
HANNA,ORM,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,83
HANNA,ORM,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,90
HANNA,ORM,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,2x18m,173
GRETE,ANSEL,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,107
GRETE,ANSEL,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,18m,64
GRETE,ANSEL,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 21 Women,2x18m,171
AKSEL,IVANOV,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,251
AKSEL,IVANOV,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,244
AKSEL,IVANOV,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,495
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,240
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,249
JOONATAN,VALK,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,489
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,228
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,245
RAO KAAREL,LÕPP,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,473
JAN-JAREK,LINNAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,250
JAN-JAREK,LINNAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,214
JAN-JAREK,LINNAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,464
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,218
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,221
LAUR JOHANNES,LOBJAKAS,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,439
IVAN,BLAGI,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,217
IVAN,BLAGI,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,18m,205
IVAN,BLAGI,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Men,2x18m,422
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,259
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,259
BRIGITA,ÕUE,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,518
KARINA,JUURIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,256
KARINA,JUURIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,248
KARINA,JUURIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,504
ALIAKSANDRA,PETRUSHENKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,242
ALIAKSANDRA,PETRUSHENKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,259
ALIAKSANDRA,PETRUSHENKA,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,501
SIMONA,JERMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,237
SIMONA,JERMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,222
SIMONA,JERMANN,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,459
KÄRT,EHANDI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,215
KÄRT,EHANDI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,217
KÄRT,EHANDI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,432
EVA-RITI,RAND,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,230
EVA-RITI,RAND,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,201
EVA-RITI,RAND,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,431
KAJA,KELDER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,216
KAJA,KELDER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,195
KAJA,KELDER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,411
EMMA,HÜTT,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,183
EMMA,HÜTT,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,221
EMMA,HÜTT,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,404
ANDRA,VIRMA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,211
ANDRA,VIRMA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,171
ANDRA,VIRMA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,382
HANNARIIN,TÄHTSALU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,181
HANNARIIN,TÄHTSALU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,18m,197
HANNARIIN,TÄHTSALU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 18 Women,2x18m,378
RUDOLF,MATZEN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,253
RUDOLF,MATZEN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,252
RUDOLF,MATZEN,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,2x15m,505
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,231
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,231
ARSENII,KAPLUN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,2x15m,462
TAIRO,PRIKS,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,212
TAIRO,PRIKS,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,224
TAIRO,PRIKS,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,2x15m,436
RASMUS,VILJASTE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,181
RASMUS,VILJASTE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,117
RASMUS,VILJASTE,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,2x15m,298
RASMUS,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,122
RASMUS,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,15m,141
RASMUS,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Men,2x15m,263
THERESA DESIREE,NOOR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,274
THERESA DESIREE,NOOR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,270
THERESA DESIREE,NOOR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,2x15m,544
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,267
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,258
ANNABEL,KOIT,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,2x15m,525
KRISTELLE,LIUKONEN,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,227
KRISTELLE,LIUKONEN,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,227
KRISTELLE,LIUKONEN,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,2x15m,454
LORENNA,LUHARI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,172
LORENNA,LUHARI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,220
LORENNA,LUHARI,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,2x15m,392
KEITY,KUUSE,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,131
KEITY,KUUSE,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,15m,174
KEITY,KUUSE,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 15 Women,2x15m,305
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,269
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,265
UKU PEETER,PEEDU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,534
RATMIR,BABITŠEV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,266
RATMIR,BABITŠEV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,250
RATMIR,BABITŠEV,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,516
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,262
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,252
ALEKSANDR,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,514
JOHANNES,LALL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,245
JOHANNES,LALL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,248
JOHANNES,LALL,TVSK Tartu Valla Spordiklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,493
SILVER,HAINSOO,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,231
SILVER,HAINSOO,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,244
SILVER,HAINSOO,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,475
VILLE AARON,AAU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,239
VILLE AARON,AAU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,235
VILLE AARON,AAU,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,474
LAURI,ÕUN,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,234
LAURI,ÕUN,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,15m,223
LAURI,ÕUN,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Men,2x15m,457
ULJANA,VINGISSAR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,257
ULJANA,VINGISSAR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,253
ULJANA,VINGISSAR,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,510
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,252
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,248
LUISA,TAMBUR,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,500
KESSU,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,226
KESSU,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,245
KESSU,VIIL,SMA Saaremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,471
ULLA,TATTER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,237
ULLA,TATTER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,231
ULLA,TATTER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,468
MARTA AMELIA,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,228
MARTA AMELIA,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,218
MARTA AMELIA,KALMUS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,446
KRISTIINA,KOPPEL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,170
KRISTIINA,KOPPEL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,178
KRISTIINA,KOPPEL,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,348
MADLEN,VALTENBERG,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,155
MADLEN,VALTENBERG,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,188
MADLEN,VALTENBERG,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,343
ELISABETH,RÄÄK,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,164
ELISABETH,RÄÄK,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,167
ELISABETH,RÄÄK,LVL Lääne Vibulaskjad,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,331
LAURA,KÜNNAPUU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,157
LAURA,KÜNNAPUU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,15m,126
LAURA,KÜNNAPUU,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Barebow Under 13 Women,2x15m,283
MIKK,ADLER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,219
MIKK,ADLER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,203
MIKK,ADLER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,422
LEHO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,210
LEHO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,185
LEHO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,395
MAREK,PEEDUMÄE,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,183
MAREK,PEEDUMÄE,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,202
MAREK,PEEDUMÄE,TVK Tartu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,385
URMAS,KONTUS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,195
URMAS,KONTUS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,187
URMAS,KONTUS,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,382
MAXIM,LUBENETS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,195
MAXIM,LUBENETS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,180
MAXIM,LUBENETS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,375
DIMO,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,191
DIMO,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,184
DIMO,ORIEHOV,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,375
LAURI,VILIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,165
LAURI,VILIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,191
LAURI,VILIBERG,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,356
UNO,KUKK,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,170
UNO,KUKK,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,182
UNO,KUKK,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,352
MAKSIMS,REBROVS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,165
MAKSIMS,REBROVS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,147
MAKSIMS,REBROVS,STR Storm Sk,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,312
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,125
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,160
PRIIT,TANVEL,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,285
KAUR,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,120
KAUR,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,18m,145
KAUR,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Men,2x18m,265
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,236
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,234
SVETLANA,TATARLÕ,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,470
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,226
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,217
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,443
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,202
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,183
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,385
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,192
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,181
INGE,SIRKEL-SUVISTE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,373
MARGE,MAISTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,157
MARGE,MAISTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,157
MARGE,MAISTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,314
TEA,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,148
TEA,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,155
TEA,KAASIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,303
MERLE,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,139
MERLE,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,142
MERLE,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,281
KAJA,LOOT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,129
KAJA,LOOT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,105
KAJA,LOOT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,234
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,68
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,18m,76
JELIZAVETA,ZUJEVA,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Women,2x18m,144
MARJU-LY,KAARJÄRV,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 70+ Women,18m,163
MARJU-LY,KAARJÄRV,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 70+ Women,18m,142
MARJU-LY,KAARJÄRV,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 70+ Women,2x18m,305
HEINO,TENNER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,197
HEINO,TENNER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,206
HEINO,TENNER,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,2x18m,403
MEELIS,PÄLLO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,181
MEELIS,PÄLLO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,201
MEELIS,PÄLLO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,2x18m,382
VELLO,ROOVEER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,174
VELLO,ROOVEER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,156
VELLO,ROOVEER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,2x18m,330
ENN,SALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,132
ENN,SALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,154
ENN,SALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,2x18m,286
ALLAN,MÄNNIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,96
ALLAN,MÄNNIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,18m,90
ALLAN,MÄNNIK,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Men,2x18m,186
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,156
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,197
ÜLLE,KELL,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,2x18m,353
TIINA,LAURISSON,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,96
TIINA,LAURISSON,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,121
TIINA,LAURISSON,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,2x18m,217
HILLE,KIRPU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,44
HILLE,KIRPU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,18m,61
HILLE,KIRPU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 60+ Women,2x18m,105
AIN,SINIJÄRV,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Men,18m,132
AIN,SINIJÄRV,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Men,18m,161
AIN,SINIJÄRV,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Men,2x18m,293
PILLERIIN,JÄRVE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Women,18m,170
PILLERIIN,JÄRVE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Women,18m,146
PILLERIIN,JÄRVE,KSK Kajamaa SK,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow 50+ Women,2x18m,316
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,18m,136
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,18m,129
VIKTOR,YEVCHYSHYN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,2x18m,265
MART,VAARIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,18m,120
MART,VAARIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,18m,96
MART,VAARIK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 21 Men,2x18m,216
KENETH,JÕKS,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,245
KENETH,JÕKS,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,250
KENETH,JÕKS,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,495
KARL AUGUST,RANDOJA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,202
KARL AUGUST,RANDOJA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,188
KARL AUGUST,RANDOJA,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,390
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,198
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,181
MAKSYM,ROSSOKHA,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,379
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,161
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,190
ANDRI,LEIMAN,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,351
RIHARD,RAMMUL,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,147
RIHARD,RAMMUL,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,116
RIHARD,RAMMUL,KVK Kagu Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,263
ROMAN,ZHEZHER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,110
ROMAN,ZHEZHER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,18m,149
ROMAN,ZHEZHER,VVVK Vana-Võidu Vibuklubi/Viljandi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Men,2x18m,259
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,258
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,246
ILONA,KALLAS,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,2x18m,504
KERTTU,KEERDO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,201
KERTTU,KEERDO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,223
KERTTU,KEERDO,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,2x18m,424
MARIAN,HERODES,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,227
MARIAN,HERODES,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,194
MARIAN,HERODES,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,2x18m,421
RONJA RINITI,ROGGENBAUM,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,209
RONJA RINITI,ROGGENBAUM,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,162
RONJA RINITI,ROGGENBAUM,MAG Mägilased,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,2x18m,371
HELENE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,155
HELENE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,18m,177
HELENE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 18 Women,2x18m,332
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,253
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,235
MARTHEN,NEPSTE,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,2x15m,488
KARL,ANTSMÄE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,222
KARL,ANTSMÄE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,204
KARL,ANTSMÄE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,2x15m,426
JAREK,BORN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,145
JAREK,BORN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,130
JAREK,BORN,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,2x15m,275
INGO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,124
INGO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,15m,109
INGO,SILLAT,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Men,2x15m,233
ANETTE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,15m,223
ANETTE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,15m,205
ANETTE,TALI,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,2x15m,428
KADRI,ULMAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,15m,193
KADRI,ULMAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,15m,181
KADRI,ULMAS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 15 Women,2x15m,374
GEORG,VIITAK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,254
GEORG,VIITAK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,245
GEORG,VIITAK,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,499
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,247
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,251
HENRI KRISTOFER,VEERSALU,SAG Sagittarius,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,498
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,253
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,239
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,492
ANDREAS,TALVISTE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,220
ANDREAS,TALVISTE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,230
ANDREAS,TALVISTE,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,450
PAUL JAKOB,VILMS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,209
PAUL JAKOB,VILMS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,237
PAUL JAKOB,VILMS,TLVK Tallinna Vibukool,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,446
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,220
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,15m,220
KARL-KULDAR,NÕMM,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Men,2x15m,440
JOHANNA,TAKKING,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,228
JOHANNA,TAKKING,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,240
JOHANNA,TAKKING,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,468
ELLA-JOANNA,SALUMAA,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,237
ELLA-JOANNA,SALUMAA,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,227
ELLA-JOANNA,SALUMAA,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,464
SOFIA-ELISABETH,JÄRVI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,209
SOFIA-ELISABETH,JÄRVI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,249
SOFIA-ELISABETH,JÄRVI,SVK Saarde Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,458
KENDRA,PORRO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,215
KENDRA,PORRO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,241
KENDRA,PORRO,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,456
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,217
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,221
MARIANN ELERI,MILLER,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,438
ANNABEL,METSALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,161
ANNABEL,METSALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,173
ANNABEL,METSALU,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,334
TEELE,SOOM,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,103
TEELE,SOOM,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,15m,114
TEELE,SOOM,VMVK Vooremaa Vibuklubi,22.03.2025,Eesti sisemeistrivõistlused 2025,Longbow Under 13 Women,2x15m,217
`,
  '24_08_2024_Eesti_Meistrivoistlused_2024.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m,204
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,70m,239
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,50m,207
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,30m,312
ANDRES,SARAPUU,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m+70m+50m+30m,962
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m,172
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,70m,243
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,50m,221
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,30m,294
PATRICK,JÄRVE,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m+70m+50m+30m,930
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m,206
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,70m,241
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,50m,178
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,30m,297
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m+70m+50m+30m,922
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m,168
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,70m,212
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,50m,220
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,30m,281
ARDO,OJAMETS,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Men,90m+70m+50m+30m,881
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m,216
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,60m,244
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,50m,192
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,30m,271
LIIS,KIRSCH,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m+60m+50m+30m,923
INGRID ANNALOORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m,159
INGRID ANNALOORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,60m,201
INGRID ANNALOORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,50m,164
INGRID ANNALOORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,30m,280
INGRID ANNALOORE,RITVAL,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m+60m+50m+30m,804
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m,178
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,60m,184
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,50m,160
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,30m,264
LISETE LAUREEN,LEPIK,VVVK Vana-Võidu Vibuklubi/Viljandi,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m+60m+50m+30m,786
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m,61
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,60m,112
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,50m,31
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,30m,82
MARLEEN,PÕBO,PVM Pärnu Vibuklubi Meelis,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - Women,70m+60m+50m+30m,286
VIKTOR,PALMET,TLVK Tallinna Vibukool,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - 70+ Men,70m,180
VIKTOR,PALMET,TLVK Tallinna Vibukool,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - 70+ Men,60m,182
VIKTOR,PALMET,TLVK Tallinna Vibukool,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - 70+ Men,50m,143
VIKTOR,PALMET,TLVK Tallinna Vibukool,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - 70+ Men,30m,213
VIKTOR,PALMET,TLVK Tallinna Vibukool,24.08.2024,Eesti Meistrivõistlused 2024,Recurve - 70+ Men,70m+60m+50m+30m,718
SVETLANA,TATARLÕ,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - Women,60m,204
SVETLANA,TATARLÕ,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - Women,50m,245
SVETLANA,TATARLÕ,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - Women,40m,233
SVETLANA,TATARLÕ,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - Women,30m,255
SVETLANA,TATARLÕ,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - Women,60m+50m+40m+30m,937
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 50+ Women,60m,117
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 50+ Women,50m,125
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 50+ Women,40m,114
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 50+ Women,30m,203
PILLERIIN,JÄRVE,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 50+ Women,60m+50m+40m+30m,559
KALJU,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,70m,93
KALJU,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,60m,156
KALJU,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,50m,126
KALJU,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,30m,270
KALJU,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,70m+60m+50m+30m,645
HEINO,TENNER,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,70m,106
HEINO,TENNER,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,60m,131
HEINO,TENNER,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,50m,101
HEINO,TENNER,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,30m,235
HEINO,TENNER,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Longbow - 60+ Men,70m+60m+50m+30m,573
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m,204
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,60m,225
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,50m,204
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,30m,281
PRIIDU,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m+60m+50m+30m,914
VAIDO,VALLI,SAG Sagittarius,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m,233
VAIDO,VALLI,SAG Sagittarius,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,60m,202
VAIDO,VALLI,SAG Sagittarius,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,50m,194
VAIDO,VALLI,SAG Sagittarius,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,30m,276
VAIDO,VALLI,SAG Sagittarius,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m+60m+50m+30m,905
AARE,LAUREN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m,185
AARE,LAUREN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,60m,214
AARE,LAUREN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,50m,196
AARE,LAUREN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,30m,287
AARE,LAUREN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Men,70m+60m+50m+30m,882
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m,166
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,50m,247
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,40m,253
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,30m,271
TERJE,PAOMETS,KSK Kajamaa Spordiklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m+50m+40m+30m,937
KATRIN,PÕDRA,TVK Tartu Vibuklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m,191
KATRIN,PÕDRA,TVK Tartu Vibuklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,50m,244
KATRIN,PÕDRA,TVK Tartu Vibuklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,40m,182
KATRIN,PÕDRA,TVK Tartu Vibuklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,30m,271
KATRIN,PÕDRA,TVK Tartu Vibuklubi,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m+50m+40m+30m,888
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m,144
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,50m,184
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,40m,163
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,30m,211
KERSTI,BAUMANN,LVL Lääne Vibulaskjad,24.08.2024,Eesti Meistrivõistlused 2024,Barebow - Women,60m+50m+40m+30m,702
`,
  '26_04_2025_Rapla_maakonna_meistrivõistlused.csv': `Eesnimi,Perekonnanimi,Klubi,Kuupäev,Võistlus,Võistlusklass,Distants,Tulemus
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,306
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,294
TRIINU,LILIENTHAL,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,2x70m,600
PRIIT,TANVEL,TVLK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,275
PRIIT,TANVEL,TVLK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,295
PRIIT,TANVEL,TVLK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,2x70m,570
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,286
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,265
KARL,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,2x70m,551
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,275
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,70m,256
AIVO,AGU,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Adults,2x70m,531
EMMA,KASK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,294
EMMA,KASK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,295
EMMA,KASK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,2x60m,589
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,281
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,304
MATTIAS,SAADLA,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,2x60m,585
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,261
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,264
MIKK,MIHKELSON,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,2x60m,525
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,258
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,60m,252
LISETTE MARIE,GOLD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 18,2x60m,510
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,30m,314
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,30m,317
KRENT,KAASIK,TVSK Tartu Valla Spordiklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,2x30m,631
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,30m,314
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,30m,316
KAROLINE,KIVILO,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 15,2x30m,630
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,333
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,340
AIN MARKUS,VÄLJA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,673
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,337
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,324
MARTEN,SOOVIK,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,661
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,319
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,327
ELIISE MARIE,KALDA,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,646
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,299
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,286
ELISABETH,DEDERER,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,585
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,287
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,266
RASMUS,ELLAM,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,553
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,239
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,15m,244
ALBERT ALBUS,ILD,JVI Järvakandi Vibuklubi Ilves,26.04.2025,Rapla maakonna meistrivõistlused,Recurve Under 13,2x15m,483
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve 50+,60m,235
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve 50+,60m,236
TIIT,HEINSALU,SJK Suure-Jaani Vibuklubi,26.04.2025,Rapla maakonna meistrivõistlused,Recurve 50+,2x60m,471
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,26.04.2025,Rapla maakonna meistrivõistlused,Compound Under 13,15m,334
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,26.04.2025,Rapla maakonna meistrivõistlused,Compound Under 13,15m,324
GERT-RAYDER,PENING,LVL Lääne Vibulaskjad,26.04.2025,Rapla maakonna meistrivõistlused,Compound Under 13,2x15m,658
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Longbow Under 13,15m,271
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Longbow Under 13,15m,307
SEBASTIAN,ZIMMER,TLVK Tallinna Vibukool,26.04.2025,Rapla maakonna meistrivõistlused,Longbow Under 13,2x15m,578
`,
};

// Age Class Hierarchy Configuration
const AGE_CLASS_HIERARCHY = {
  'U13': ['U13', 'U15', 'U18', 'U21', ''],  // U13 competes in all junior + adult
  'U15': ['U15', 'U18', 'U21', ''],         // U15 competes in U15, U18, U21, adult
  'U18': ['U18', 'U21', ''],                // U18 competes in U18, U21, adult
  'U21': ['U21', ''],                       // U21 competes in U21, adult
  '': [''],                                 // Adult only competes in adult
  '+50': ['+50', '+60', '+70', ''],         // +50 competes in all senior + adult
  '+60': ['+60', '+70', ''],                // +60 competes in +60, +70, adult
  '+70': ['+70', '']                        // +70 competes in +70, adult
};

// Priority for determining athlete's primary age class (youngest for juniors, oldest for seniors)
const AGE_CLASS_PRIORITY = ['U13', 'U15', 'U18', 'U21', '', '+70', '+60', '+50'];

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[len2][len1];
}

// Common terms to exclude from club name matching
const COMMON_CLUB_TERMS = [
  'spordikool',
  'vibukool',
  'vibuklubi',
  'spordiklubi',
  'sk',
  'vk',
  'archery',
  'club',
  'sc'
];

function removeCommonTerms(str) {
  let cleaned = str.toLowerCase();
  
  // Remove common terms
  COMMON_CLUB_TERMS.forEach(term => {
    // Use word boundary regex to avoid partial matches
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    cleaned = cleaned.replace(regex, '');
  });
  
  // Remove extra spaces and trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

function similarityPercentage(str1, str2) {
  const lower1 = str1.toLowerCase();
  const lower2 = str2.toLowerCase();
  
  // Only remove common terms if BOTH strings are long (full names, not codes)
  // Short strings (≤5 chars) are likely codes like "TLVK", "VVK", "KSK"
  const shouldRemoveTerms = lower1.length > 5 && lower2.length > 5;
  
  let compare1, compare2;
  
  if (shouldRemoveTerms) {
    // Remove common terms for full name comparison
    compare1 = removeCommonTerms(str1);
    compare2 = removeCommonTerms(str2);
    
    // If both become empty after cleaning, use original strings
    if (!compare1 || !compare2) {
      compare1 = lower1;
      compare2 = lower2;
    }
  } else {
    // For codes or mixed length, use original strings
    compare1 = lower1;
    compare2 = lower2;
  }
  
  const distance = levenshteinDistance(compare1, compare2);
  const maxLen = Math.max(compare1.length, compare2.length);
  return ((maxLen - distance) / maxLen) * 100;
}

function findBestMatch(input, list, threshold) {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const item of list) {
    const score = similarityPercentage(input, item);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestMatch = item;
    }
  }
  
  return { match: bestMatch, score: bestScore };
}

// Generate recommendations for issues - Only from matching settings lists
function generateRecommendation(issue, record, settings) {
  const field = issue.field;
  const originalValue = record._originalData;
  
  // CLUB FIELD - Only recommend from clubs list
  if (field === 'Club') {
    const klubiRaw = originalValue['Klubi'] || originalValue['klubi'] || '';
    if (klubiRaw) {
      const klubiTrimmed = klubiRaw.trim();
      
      // Try exact code match first (with defensive trimming)
      const clubByCode = settings.clubs.find(c => 
        c.code.trim().toLowerCase() === klubiTrimmed.toLowerCase()
      );
      if (clubByCode) {
        return { value: clubByCode.fullName, confidence: 100, method: 'Code Match from Clubs List' };
      }
      
      // Try code prefix match (e.g., "STR Storm SK" starts with "STR")
      const clubByCodePrefix = settings.clubs.find(c => {
        const code = c.code.trim();
        const input = klubiTrimmed;
        const regex = new RegExp(`^${code}\\s`, 'i');
        return regex.test(input) || input.toLowerCase() === code.toLowerCase();
      });
      if (clubByCodePrefix) {
        return { value: clubByCodePrefix.fullName, confidence: 100, method: 'Code Prefix Match from Clubs List' };
      }
      
      // Try fuzzy match against clubs list only
      const clubNames = settings.clubs.map(c => c.fullName);
      const match = findBestMatch(klubiTrimmed, clubNames, 50);
      if (match.match) {
        return { value: match.match, confidence: Math.round(match.score), method: 'Fuzzy Match from Clubs List' };
      }
    }
  } 
  
  // BOW TYPE - Only recommend from bow types list
  else if (field === 'Bow Type') {
    const voistlusklass = originalValue['Võistlusklass'] || originalValue['voistlusklass'] || '';
    if (voistlusklass) {
      // Try to find bow type from Estonian translations
      const klassLower = voistlusklass.toLowerCase();
      for (const bowType of settings.bowTypes) {
        const estonianName = settings.estonianTranslations[bowType];
        if (estonianName && klassLower.includes(estonianName.toLowerCase())) {
          return { value: bowType, confidence: 95, method: 'Matched from Bow Types List' };
        }
      }
      
      // Fuzzy match against bow types
      const match = findBestMatch(voistlusklass, settings.bowTypes, 50);
      if (match.match) {
        return { value: match.match, confidence: Math.round(match.score), method: 'Fuzzy Match from Bow Types List' };
      }
    }
  }
  
  // AGE CLASS - Only recommend from age groups list
  else if (field === 'Age Class') {
    const voistlusklass = originalValue['Võistlusklass'] || originalValue['voistlusklass'] || '';
    if (voistlusklass) {
      const klassLower = voistlusklass.toLowerCase();
      
      // Try exact match
      for (const age of settings.ageGroups) {
        if (age && klassLower.includes(age.toLowerCase())) {
          return { value: age, confidence: 100, method: 'Exact Match from Age Groups List' };
        }
      }
      
      // Fuzzy match
      const ageGroupsFiltered = settings.ageGroups.filter(a => a); // Remove empty/adult
      const match = findBestMatch(voistlusklass, ageGroupsFiltered, 50);
      if (match.match) {
        return { value: match.match, confidence: Math.round(match.score), method: 'Fuzzy Match from Age Groups List' };
      }
    }
  }
  
  // SHOOTING EXERCISE - Only recommend from shooting exercises list
  else if (field === 'Shooting Exercise' || field === 'Distance') {
    const distants = originalValue['Distants'] || originalValue['distants'] || '';
    if (distants) {
      // Try to standardize format first
      const numbers = distants.match(/\d+/g);
      if (numbers && numbers.length === 1) {
        const standardized = `${numbers[0]}m`;
        if (settings.shootingExercises.includes(standardized)) {
          return { value: standardized, confidence: 100, method: 'Standardized to Shooting Exercises List' };
        }
      }
      
      // Check for 2x format
      if (distants.toLowerCase().includes('2') && numbers && numbers.length >= 1) {
        const standardized = `2x${numbers[numbers.length - 1]}m`;
        if (settings.shootingExercises.includes(standardized)) {
          return { value: standardized, confidence: 100, method: 'Standardized to Shooting Exercises List' };
        }
      }
      
      // Fuzzy match against shooting exercises list
      const match = findBestMatch(distants, settings.shootingExercises, 50);
      if (match.match) {
        return { value: match.match, confidence: Math.round(match.score), method: 'Fuzzy Match from Shooting Exercises List' };
      }
    }
  }
  
  // ATHLETE NAME - Assembly from first + last name
  else if (field === 'Athlete') {
    const eesnimi = originalValue['Eesnimi'] || originalValue['eesnimi'] || '';
    const perekonnanimi = originalValue['Perekonnanimi'] || originalValue['perekonnanimi'] || '';
    if (eesnimi && perekonnanimi) {
      return { value: `${eesnimi} ${perekonnanimi}`.trim(), confidence: 100, method: 'Name Assembly' };
    }
  } 
  
  // DATE - Format conversion
  else if (field === 'Date') {
    const kuupaev = originalValue['Kuupäev'] || originalValue['kuupäev'] || '';
    if (kuupaev) {
      const parsed = parseToEUDate(kuupaev);
      if (parsed) {
        return { value: parsed, confidence: 90, method: 'Date Format Conversion' };
      }
      
      // Try to extract date parts
      const numbers = kuupaev.match(/\d+/g);
      if (numbers && numbers.length === 3) {
        const [d, m, y] = numbers;
        if (d && m && y) {
          const day = d.padStart(2, '0');
          const month = m.padStart(2, '0');
          return { value: `${day}.${month}.${y}`, confidence: 70, method: 'Date Part Extraction' };
        }
      }
    }
  }
  
  // COMPETITION - Direct copy if exists
  else if (field === 'Competition') {
    const voistlus = originalValue['Võistlus'] || originalValue['voistlus'] || '';
    if (voistlus && voistlus.trim()) {
      return { value: voistlus.trim(), confidence: 100, method: 'Direct Value' };
    }
  }
  
  // RESULT - Validation
  else if (field === 'Result') {
    const tulemus = originalValue['Tulemus'] || originalValue['tulemus'] || '';
    if (tulemus) {
      const numValue = parseFloat(String(tulemus).replace(',', '.'));
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 1440) {
        return { value: numValue.toString(), confidence: 100, method: 'Number Validation' };
      }
    }
  }
  
  return null;
}

// Parse date to EU format (DD.MM.YYYY)
function parseToEUDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  
  dateStr = dateStr.trim();
  
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return dateStr.replace(/\//g, '.');
  }
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  }
  
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    return dateStr.replace(/-/g, '.');
  }
  
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  return null;
}

// Validate result score
function validateResult(value) {
  if (value === null || value === undefined || value === '') {
    return { valid: false, value: null, message: 'Empty result' };
  }
  
  const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
  
  if (isNaN(numValue)) {
    return { valid: false, value: null, message: 'Not a number' };
  }
  
  if (numValue < 0 || numValue > 1440) {
    return { valid: false, value: numValue, message: `Out of range (0-1440): ${numValue}` };
  }
  
  return { valid: true, value: numValue, message: 'Valid' };
}

// Export/Import settings functions (simplified for brevity)
function exportSettingsToCSV(settings) {
  const lines = [];
  lines.push('THRESHOLDS');
  lines.push('Setting,Value');
  lines.push(`Athlete Name Threshold,${settings.athleteThreshold}`);
  lines.push(`Club Name Threshold,${settings.clubThreshold}`);
  lines.push('');
  lines.push('CLUBS');
  lines.push('Code,Full Name');
  settings.clubs.forEach(club => {
    lines.push(`${club.code},${club.fullName}`);
  });
  lines.push('');
  lines.push('BOW_TYPES');
  settings.bowTypes.forEach(type => lines.push(type));
  lines.push('');
  lines.push('AGE_GROUPS');
  settings.ageGroups.forEach(group => lines.push(group || 'Adult'));
  lines.push('');
  lines.push('SHOOTING_EXERCISES');
  settings.shootingExercises.forEach(exercise => lines.push(exercise));
  lines.push('');
  lines.push('ESTONIAN_TRANSLATIONS');
  lines.push('English,Estonian');
  Object.entries(settings.estonianTranslations).forEach(([eng, est]) => {
    lines.push(`${eng},${est}`);
  });
  lines.push('');
  lines.push('GENDER_KEYWORDS');
  lines.push('Gender,Keywords');
  if (settings.genderKeywords) {
    Object.entries(settings.genderKeywords).forEach(([gender, keywords]) => {
      lines.push(`${gender},${keywords.join(';')}`);
    });
  }
  return lines.join('\n');
}

function importSettingsFromCSV(csvText) {
  // Remove BOM if present
  if (csvText.charCodeAt(0) === 0xFEFF) {
    csvText = csvText.substring(1);
  }
  
  // Split by various line endings and filter empty lines
  const lines = csvText.split(/\r?\n/).map(line => line.trim()).filter(line => line);
  
  console.log('Importing CSV settings, total lines:', lines.length);
  console.log('First 5 lines:', lines.slice(0, 5));
  
  const settings = {
    athleteThreshold: 90,
    clubThreshold: 70,
    clubs: [],
    bowTypes: [],
    ageGroups: [],
    shootingExercises: [],
    estonianTranslations: {},
    genderKeywords: { 'Men': [], 'Women': [] }
  };
  
  let currentSection = null;
  let skipNextLine = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line === 'THRESHOLDS') {
      currentSection = 'THRESHOLDS';
      skipNextLine = true;
      console.log('Section: THRESHOLDS');
      continue;
    } else if (line === 'CLUBS') {
      currentSection = 'CLUBS';
      skipNextLine = true;
      console.log('Section: CLUBS');
      continue;
    } else if (line === 'BOW_TYPES') {
      currentSection = 'BOW_TYPES';
      console.log('Section: BOW_TYPES');
      continue;
    } else if (line === 'AGE_GROUPS') {
      currentSection = 'AGE_GROUPS';
      console.log('Section: AGE_GROUPS');
      continue;
    } else if (line === 'SHOOTING_EXERCISES') {
      currentSection = 'SHOOTING_EXERCISES';
      console.log('Section: SHOOTING_EXERCISES');
      continue;
    } else if (line === 'ESTONIAN_TRANSLATIONS') {
      currentSection = 'ESTONIAN_TRANSLATIONS';
      skipNextLine = true;
      console.log('Section: ESTONIAN_TRANSLATIONS');
      continue;
    } else if (line === 'GENDER_KEYWORDS') {
      currentSection = 'GENDER_KEYWORDS';
      skipNextLine = true;
      console.log('Section: GENDER_KEYWORDS');
      continue;
    }
    
    if (skipNextLine) {
      skipNextLine = false;
      continue;
    }
    
    if (currentSection === 'THRESHOLDS') {
      const [setting, value] = line.split(',');
      if (setting && value) {
        if (setting.includes('Athlete')) {
          settings.athleteThreshold = parseInt(value);
        } else if (setting.includes('Club')) {
          settings.clubThreshold = parseInt(value);
        }
      }
    } else if (currentSection === 'CLUBS') {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const code = parts[0].trim();
        const fullName = parts.slice(1).join(',').trim(); // Handle commas in club names
        settings.clubs.push({ code, fullName });
      }
    } else if (currentSection === 'BOW_TYPES') {
      settings.bowTypes.push(line);
    } else if (currentSection === 'AGE_GROUPS') {
      settings.ageGroups.push(line === 'Adult' ? '' : line);
    } else if (currentSection === 'SHOOTING_EXERCISES') {
      settings.shootingExercises.push(line);
    } else if (currentSection === 'ESTONIAN_TRANSLATIONS') {
      const [eng, est] = line.split(',');
      if (eng && est) {
        settings.estonianTranslations[eng.trim()] = est.trim();
      }
    } else if (currentSection === 'GENDER_KEYWORDS') {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const gender = parts[0].trim();
        const keywordsStr = parts[1].trim();
        settings.genderKeywords[gender] = keywordsStr.split(';').map(k => k.trim());
      }
    }
  }
  
  console.log('Import complete:', {
    clubs: settings.clubs.length,
    bowTypes: settings.bowTypes.length,
    ageGroups: settings.ageGroups.length,
    shootingExercises: settings.shootingExercises.length,
    translations: Object.keys(settings.estonianTranslations).length,
    genderKeywords: Object.keys(settings.genderKeywords)
  });
  
  return settings;
}

const defaultSettings = {
  athleteThreshold: 90,
  clubThreshold: 70,
  clubs: [
    { code: 'VVVK', fullName: 'Vana-Võidu VK/Viljandi SK' },
    { code: 'VILJ', fullName: 'Vana-Võidu VK/Viljandi SK' }, // Alias for VVVK
    { code: 'SAG', fullName: 'Sagittarius' },
    { code: 'TLVK', fullName: 'Tallinna VK' },
    { code: 'TVSK', fullName: 'Tartu Valla Spordiklubi' },
    { code: 'JVI', fullName: 'Järvakandi Vibuklubi Ilves' },
    { code: 'PVM', fullName: 'Pärnu Vibuklubi Meelis' },
    { code: 'PM', fullName: 'Pärnu Vibuklubi Meelis' }, // Alias for PVM
    { code: 'KSK', fullName: 'Kajamaa SK' },
    { code: 'SJK', fullName: 'Suure-Jaani Vibuklubi' },
    { code: 'SJV', fullName: 'Suure-Jaani Vibuklubi' }, // Alias for SJK
    { code: 'SJVK', fullName: 'Suure-Jaani Vibuklubi' }, // Alias for SJK
    { code: 'STR', fullName: 'Storm SK' },
    { code: 'STO', fullName: 'Storm SK' }, // Alias for STR
    { code: 'MAG', fullName: 'Mägilased' },
    { code: 'TYRI', fullName: 'Türi Vibukool' },
    { code: 'BH', fullName: 'Baltic Hunter SC' },
    { code: 'KVK', fullName: 'Kagu Vibuklubi' },
    { code: 'LVL', fullName: 'Lääne Vibulaskjad' },
    { code: 'LV', fullName: 'Lääne Vibulaskjad' }, // Alias for LVL
    { code: 'VVK', fullName: 'Vooremaa Vibuklubi' },
    { code: 'VMVK', fullName: 'Vooremaa Vibuklubi' }, // Alias for VVK
    { code: 'SVK', fullName: 'Saarde Vibuklubi' },
    { code: 'TL', fullName: 'TäheLend' },
    { code: 'THL', fullName: 'TäheLend' }, // Alias for TL
    { code: 'AMA', fullName: 'Amazones' },
    { code: 'AMZ', fullName: 'Amazones' }, // Alias for AMA
    { code: 'NS', fullName: 'NS Archery Club' },
    { code: 'TVK', fullName: 'Tartu Vibuklubi' },
    { code: 'SMA', fullName: 'Saaremaa Vibuklubi' },
  ],
  ageGroups: ['', 'U21', 'U18', 'U15', 'U13', '+50', '+60', '+70'],
  shootingExercises: ['15m', '18m', '25m', '30m', '50m', '60m', '70m', '90m', '2x15m', '2x18m', '2x25m', '2x30m', '2x50m', '2x60m', '2x70m'],
  bowTypes: ['Recurve', 'Compound', 'Barebow', 'Longbow'],
  estonianTranslations: {
    'Recurve': 'Sportvibu',
    'Compound': 'Plokkvibu',
    'Barebow': 'Vaistuvibu',
    'Longbow': 'Pikkvibu',
    'Men': 'Mehed',
    'Women': 'Naised',
    'Adult': 'Täiskasvanud',
  },
  genderKeywords: {
    'Men': ['mehed', 'men', 'noormehed', 'poisid'],
    'Women': ['naised', 'women', 'neiud', 'tüdrukud']
  }
};

// Apply hierarchical age classes to all records
// This function:
// 1. Determines each athlete's primary age class for a given year (lowest for youth, highest for seniors)
// 2. Assigns that primary age class to ALL results from that year
// 3. Adds a hidden 'Age Classes' array containing all applicable age categories for filtering
// Visual display shows only the primary age class, but filtering works across all hierarchical tags
function applyHierarchicalAgeClasses(records) {
  // Step 1: Build athlete-year age class map
  const athleteYearAgeClass = {};
  
  records.forEach(record => {
    const athlete = record.Athlete;
    const date = record.Date;
    const ageClass = record['Age Class'] || '';
    
    if (!athlete || !date) return;
    
    // Extract year from date
    const dateParts = date.split('.');
    const year = dateParts.length === 3 ? dateParts[2] : null;
    
    if (!year) return;
    
    const key = `${athlete}-${year}`;
    
    // If we haven't seen this athlete-year combination, or if this age class has higher priority
    if (!athleteYearAgeClass[key]) {
      athleteYearAgeClass[key] = ageClass;
    } else {
      // Choose the more specific age class (higher priority = more specific)
      const currentPriority = AGE_CLASS_PRIORITY.indexOf(athleteYearAgeClass[key]);
      const newPriority = AGE_CLASS_PRIORITY.indexOf(ageClass);
      
      if (newPriority < currentPriority) {
        athleteYearAgeClass[key] = ageClass;
      }
    }
  });
  
  // Step 2: Apply hierarchical age classes to all records
  return records.map(record => {
    const athlete = record.Athlete;
    const date = record.Date;
    
    if (!athlete || !date) return record;
    
    // Extract year
    const dateParts = date.split('.');
    const year = dateParts.length === 3 ? dateParts[2] : null;
    
    if (!year) return record;
    
    const key = `${athlete}-${year}`;
    const primaryAgeClass = athleteYearAgeClass[key];
    
    // Get all applicable age classes based on hierarchy
    const applicableAgeClasses = AGE_CLASS_HIERARCHY[primaryAgeClass] || [''];
    
    return {
      ...record,
      'Age Class': primaryAgeClass,          // Keep the primary age class
      'Age Classes': applicableAgeClasses,   // Add array of all applicable age classes
      '_primaryAgeClass': primaryAgeClass    // Store for reference
    };
  });
}

function parseCSV(text) {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return { headers: [], data: [] };
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const row = { _id: index + 1, _originalData: {} };
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
      row._originalData[header] = values[i] || '';
    });
    return row;
  });
  
  return { headers, data };
}

function SettingsModal({ settings, onSave, onClose }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [newClubCode, setNewClubCode] = useState('');
  const [newClubName, setNewClubName] = useState('');
  const fileInputRef = useRef(null);

  const addClub = () => {
    if (newClubCode && newClubName) {
      setLocalSettings({
        ...localSettings,
        clubs: [...localSettings.clubs, { code: newClubCode.toUpperCase(), fullName: newClubName }]
      });
      setNewClubCode('');
      setNewClubName('');
    }
  };

  const removeClub = (index) => {
    setLocalSettings({
      ...localSettings,
      clubs: localSettings.clubs.filter((_, i) => i !== index)
    });
  };

  const exportSettings = () => {
    const csvContent = exportSettingsToCSV(localSettings);
    console.log('Exporting settings, CSV length:', csvContent.length);
    console.log('First 500 chars:', csvContent.substring(0, 500));
    
    // Add UTF-8 BOM for better Excel compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parsing_settings_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Settings exported successfully');
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = importSettingsFromCSV(e.target.result);
        
        // Detailed validation with specific error messages
        const validationErrors = [];
        
        if (!imported.athleteThreshold || imported.athleteThreshold < 50 || imported.athleteThreshold > 100) {
          validationErrors.push('Invalid or missing Athlete Threshold (must be 50-100)');
        }
        if (!imported.clubThreshold || imported.clubThreshold < 50 || imported.clubThreshold > 100) {
          validationErrors.push('Invalid or missing Club Threshold (must be 50-100)');
        }
        if (!imported.clubs || imported.clubs.length === 0) {
          validationErrors.push('No clubs found in CSV');
        }
        if (!imported.bowTypes || imported.bowTypes.length === 0) {
          validationErrors.push('No bow types found in CSV');
        }
        if (!imported.ageGroups || imported.ageGroups.length === 0) {
          validationErrors.push('No age groups found in CSV');
        }
        if (!imported.shootingExercises || imported.shootingExercises.length === 0) {
          validationErrors.push('No shooting exercises found in CSV');
        }
        if (!imported.estonianTranslations || Object.keys(imported.estonianTranslations).length === 0) {
          validationErrors.push('No Estonian translations found in CSV');
        }
        if (!imported.genderKeywords || !imported.genderKeywords.Men || !imported.genderKeywords.Women) {
          validationErrors.push('Gender keywords missing or incomplete');
        }
        
        if (validationErrors.length > 0) {
          alert('Settings import failed:\n\n' + validationErrors.join('\n'));
          console.error('Import validation errors:', validationErrors);
          console.log('Imported settings:', imported);
        } else {
          setLocalSettings(imported);
          alert(`Settings imported successfully!\n\n` +
                `✓ ${imported.clubs.length} clubs\n` +
                `✓ ${imported.bowTypes.length} bow types\n` +
                `✓ ${imported.ageGroups.length} age groups\n` +
                `✓ ${imported.shootingExercises.length} shooting exercises`);
        }
      } catch (error) {
        alert('Error parsing CSV settings file:\n\n' + error.message);
        console.error('CSV parse error:', error);
      }
    };
    
    reader.onerror = (error) => {
      alert('Error reading file: ' + error);
      console.error('File read error:', error);
    };
    
    reader.readAsText(file, 'UTF-8');
    event.target.value = '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold">Parsing Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Import/Export Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold mb-2">Import/Export Settings (CSV)</h3>
              <div className="flex gap-2">
                <button onClick={exportSettings} className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                  <FileDown className="w-4 h-4" />
                  Export
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2">
                  <FileUp className="w-4 h-4" />
                  Import
                </button>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={importSettings} className="hidden" />
              </div>
              <p className="text-xs text-gray-600 mt-2">UTF-8 supported. Check console (F12) for import logs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Thresholds */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Matching Thresholds</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Athlete: {localSettings.athleteThreshold}%
                      </label>
                      <input type="range" min="50" max="100" value={localSettings.athleteThreshold} onChange={(e) => setLocalSettings({...localSettings, athleteThreshold: parseInt(e.target.value)})} className="w-full h-1" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Club: {localSettings.clubThreshold}%
                      </label>
                      <input type="range" min="50" max="100" value={localSettings.clubThreshold} onChange={(e) => setLocalSettings({...localSettings, clubThreshold: parseInt(e.target.value)})} className="w-full h-1" />
                    </div>
                  </div>
                </div>

                {/* Clubs */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Clubs ({localSettings.clubs.length})</h3>
                  <div className="space-y-1 mb-2 max-h-40 overflow-y-auto border rounded p-2">
                    {localSettings.clubs.map((club, index) => (
                      <div key={index} className="flex items-center gap-2 p-1 bg-gray-50 rounded text-xs">
                        <span className="font-mono font-semibold text-blue-600">{club.code}</span>
                        <span className="flex-1 truncate">{club.fullName}</span>
                        <button onClick={() => removeClub(index)} className="text-red-600 hover:text-red-800">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={newClubCode} onChange={(e) => setNewClubCode(e.target.value)} placeholder="Code" className="px-2 py-1 text-xs border rounded w-20" />
                    <input type="text" value={newClubName} onChange={(e) => setNewClubName(e.target.value)} placeholder="Full name" className="flex-1 px-2 py-1 text-xs border rounded" />
                    <button onClick={addClub} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Bow Types */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Bow Types & Translations</h3>
                  <div className="space-y-1">
                    {localSettings.bowTypes.map((type, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                        <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-semibold min-w-[70px] text-center">
                          {type}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs font-medium text-blue-900">
                          {localSettings.estonianTranslations?.[type] || '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Age Groups */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Age Groups</h3>
                  <div className="flex flex-wrap gap-1">
                    {localSettings.ageGroups.map((group, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        {group || 'Adult'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gender Keywords */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Gender Keywords</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-xs font-semibold text-blue-900 mb-1">Men (Mehed)</div>
                      <div className="flex flex-wrap gap-1">
                        {(localSettings.genderKeywords?.Men || ['mehed', 'men', 'noormehed', 'poisid']).map((keyword, index) => (
                          <span key={index} className="px-2 py-0.5 bg-white text-blue-800 rounded border border-blue-300 text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-2 bg-pink-50 rounded border border-pink-200">
                      <div className="text-xs font-semibold text-pink-900 mb-1">Women (Naised)</div>
                      <div className="flex flex-wrap gap-1">
                        {(localSettings.genderKeywords?.Women || ['naised', 'women', 'neiud', 'tüdrukud']).map((keyword, index) => (
                          <span key={index} className="px-2 py-0.5 bg-white text-pink-800 rounded border border-pink-300 text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shooting Exercises */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Shooting Exercises ({localSettings.shootingExercises.length})</h3>
                  <div className="flex flex-wrap gap-1">
                    {localSettings.shootingExercises.map((exercise, index) => (
                      <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        {exercise}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-between flex-shrink-0">
          <button onClick={() => setLocalSettings(defaultSettings)} className="px-3 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300">
            Reset to Defaults
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={() => { onSave(localSettings); onClose(); }} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function applyAdvancedParsing(data, settings, existingAthletes = []) {
  const results = { parsed: [], needsReview: [], logs: [], corrections: [] };

  data.forEach((row) => {
    const parsed = { ...row };
    const issues = [];
    const corrections = [];
    const log = { rowId: row._id, layers: [] };

    const eesnimi = row['Eesnimi'] || row['eesnimi'] || '';
    const perekonnanimi = row['Perekonnanimi'] || row['perekonnanimi'] || '';
    
    if (eesnimi && perekonnanimi) {
      parsed['Athlete'] = `${eesnimi} ${perekonnanimi}`.trim();
    } else {
      issues.push({ field: 'Athlete', message: 'Missing name', severity: 'error' });
    }

    if (parsed['Athlete']) {
      const match = findBestMatch(parsed['Athlete'], existingAthletes, settings.athleteThreshold);
      if (match.match && match.score < 100) {
        corrections.push({ field: 'Athlete', original: parsed['Athlete'], corrected: match.match, method: `Fuzzy Match (${match.score.toFixed(0)}%)` });
        parsed['Athlete'] = match.match;
      }
    }

    const klubiRaw = row['Klubi'] || row['klubi'] || '';
    if (klubiRaw) {
      // Trim whitespace from input
      const klubiTrimmed = klubiRaw.trim();
      let clubProcessed = klubiTrimmed;
      
      // Strategy 1: Exact code match (e.g., "STR" matches club code "STR")
      const clubByCode = settings.clubs.find(c => 
        c.code.trim().toLowerCase() === klubiTrimmed.toLowerCase()
      );
      
      if (clubByCode) {
        corrections.push({ field: 'Club', original: klubiRaw, corrected: clubByCode.fullName, method: 'Code Conversion' });
        clubProcessed = clubByCode.fullName;
      } else {
        // Strategy 2: Check if input STARTS with a club code (e.g., "STR Storm SK" starts with "STR")
        const clubByCodePrefix = settings.clubs.find(c => {
          const code = c.code.trim();
          const input = klubiTrimmed;
          // Check if input starts with the code (case insensitive, word boundary)
          const regex = new RegExp(`^${code}\\s`, 'i');
          return regex.test(input) || input.toLowerCase() === code.toLowerCase();
        });
        
        if (clubByCodePrefix) {
          corrections.push({ field: 'Club', original: klubiRaw, corrected: clubByCodePrefix.fullName, method: 'Code Prefix Match' });
          clubProcessed = clubByCodePrefix.fullName;
        } else {
          // Strategy 3: Fuzzy match against full names
          const clubNames = settings.clubs.map(c => c.fullName);
          const match = findBestMatch(klubiTrimmed, clubNames, settings.clubThreshold);
          if (match.match && match.match !== klubiTrimmed) {
            corrections.push({ field: 'Club', original: klubiRaw, corrected: match.match, method: `Fuzzy Match (${match.score.toFixed(0)}%)` });
            clubProcessed = match.match;
          } else if (!match.match) {
            // Club not found in settings - this is an ERROR that needs review
            issues.push({ field: 'Club', message: `Unknown club: ${klubiTrimmed}`, severity: 'error' });
          }
        }
      }
      parsed['Club'] = clubProcessed;
    }

    const voistlusklass = row['Võistlusklass'] || row['voistlusklass'] || '';
    if (voistlusklass) {
      const klassLower = voistlusklass.toLowerCase();
      
      // STEP 1: Try to find bow type (check BOTH English and Estonian)
      let bowType = null;
      
      // First check if English bow type name is in the string directly
      for (const englishBowType of settings.bowTypes) {
        if (klassLower.includes(englishBowType.toLowerCase())) {
          bowType = englishBowType;
          break;
        }
      }
      
      // If not found in English, check Estonian translations
      if (!bowType) {
        for (const [eng, est] of Object.entries(settings.estonianTranslations)) {
          if (settings.bowTypes.includes(eng) && klassLower.includes(est.toLowerCase())) {
            bowType = eng;
            break;
          }
        }
      }
      
      // STEP 2: Try to find age class (check both Võistlusklass and separate column)
      let ageClass = '';
      let ageClassFromSeparateColumn = false;
      
      // First, check if there's a separate age class/group column
      const separateAgeClass = row['Vanuserühm'] || row['vanuserühm'] || 
                               row['Age Class'] || row['age class'] ||
                               row['Age Group'] || row['age group'] ||
                               row['Vanuseklass'] || row['vanuseklass'] || '';
      
      if (separateAgeClass) {
        // Try to match the separate column value against age groups
        const ageClassTrimmed = separateAgeClass.trim();
        for (const age of settings.ageGroups) {
          if (age && ageClassTrimmed.toLowerCase() === age.toLowerCase()) {
            ageClass = age;
            ageClassFromSeparateColumn = true;
            break;
          }
        }
        
        // If no exact match, try contains
        if (!ageClass) {
          for (const age of settings.ageGroups) {
            if (age && ageClassTrimmed.toLowerCase().includes(age.toLowerCase())) {
              ageClass = age;
              ageClassFromSeparateColumn = true;
              break;
            }
          }
        }
      }
      
      // If not found in separate column, check within Võistlusklass
      if (!ageClass) {
        for (const age of settings.ageGroups) {
          if (age && klassLower.includes(age.toLowerCase())) {
            ageClass = age;
            break;
          }
        }
      }
      
      // STEP 3: Try to find gender (check Women FIRST to avoid "women" matching "men")
      let gender = null;
      if (settings.genderKeywords) {
        // Check Women keywords FIRST (because "women" contains "men" substring!)
        if (settings.genderKeywords['Women'].some(keyword => klassLower.includes(keyword.toLowerCase()))) {
          gender = 'Women';
        }
        // Check Men keywords
        else if (settings.genderKeywords['Men'].some(keyword => klassLower.includes(keyword.toLowerCase()))) {
          gender = 'Men';
        }
      } else {
        // Fallback - check Women first
        if (klassLower.includes('naised') || klassLower.includes('women') || klassLower.includes('neiud') || klassLower.includes('tüdrukud')) {
          gender = 'Women';
        } else if (klassLower.includes('mehed') || klassLower.includes('men') || klassLower.includes('noormehed') || klassLower.includes('poisid')) {
          gender = 'Men';
        }
      }
      
      // Default to Men if gender is missing but bow type is found
      if (!gender && bowType) {
        gender = 'Men';
        corrections.push({ field: 'Gender', original: voistlusklass, corrected: 'Men', method: 'Default (Gender Missing)' });
      }
      
      if (bowType && gender) {
        corrections.push({ field: 'Class Split', original: voistlusklass, corrected: `${bowType} / ${ageClass || 'Adult'} / ${gender}`, method: 'Class Parsing' });
        
        // Track if age class came from a separate column
        if (ageClassFromSeparateColumn && ageClass) {
          corrections.push({ field: 'Age Class', original: separateAgeClass, corrected: ageClass, method: 'Separate Age Column' });
        }
        
        parsed['Bow Type'] = bowType;
        parsed['Age Class'] = ageClass;
        parsed['Gender'] = gender;
      } else {
        issues.push({ field: 'Class', message: 'Parse failed', severity: 'error' });
      }
    }

    const distants = row['Distants'] || row['distants'] || '';
    if (distants) {
      const singleMatch = distants.match(/^(\d+)\s*m$/i);
      const doubleMatch = distants.match(/^2\s*[xX×]\s*(\d+)\s*m$/i);
      
      if (singleMatch) {
        const formatted = `${singleMatch[1]}m`;
        
        // Check if this distance is in the approved settings list
        if (settings.shootingExercises.includes(formatted)) {
          if (formatted !== distants) {
            corrections.push({ field: 'Distance', original: distants, corrected: formatted, method: 'Format Standardization' });
          }
          parsed['Shooting Exercise'] = formatted;
        } else {
          // Valid format but not in approved list - needs review
          issues.push({ field: 'Shooting Exercise', message: `Unknown distance: ${formatted}`, severity: 'error' });
          parsed['Shooting Exercise'] = formatted;
        }
      } else if (doubleMatch) {
        const formatted = `2x${doubleMatch[1]}m`;
        
        // Check if this distance is in the approved settings list
        if (settings.shootingExercises.includes(formatted)) {
          if (formatted !== distants) {
            corrections.push({ field: 'Distance', original: distants, corrected: formatted, method: 'Format Standardization' });
          }
          parsed['Shooting Exercise'] = formatted;
        } else {
          // Valid format but not in approved list - needs review
          issues.push({ field: 'Shooting Exercise', message: `Unknown distance: ${formatted}`, severity: 'error' });
          parsed['Shooting Exercise'] = formatted;
        }
      } else {
        // Invalid format
        parsed['Shooting Exercise'] = distants;
        issues.push({ field: 'Shooting Exercise', message: 'Invalid format', severity: 'error' });
      }
    }

    const kuupaev = row['Kuupäev'] || row['kuupäev'] || '';
    if (kuupaev) {
      const euDate = parseToEUDate(kuupaev);
      if (euDate) {
        if (euDate !== kuupaev) corrections.push({ field: 'Date', original: kuupaev, corrected: euDate, method: 'EU Format Conversion' });
        parsed['Date'] = euDate;
      } else {
        issues.push({ field: 'Date', message: 'Invalid format', severity: 'error' });
        parsed['Date'] = kuupaev;
      }
    } else {
      issues.push({ field: 'Date', message: 'Missing', severity: 'error' });
    }

    const voistlus = row['Võistlus'] || row['voistlus'] || '';
    if (voistlus) {
      parsed['Competition'] = voistlus.trim();
    } else {
      issues.push({ field: 'Competition', message: 'Missing', severity: 'error' });
    }

    const tulemus = row['Tulemus'] || row['tulemus'] || '';
    const resultValidation = validateResult(tulemus);
    if (resultValidation.valid) {
      parsed['Result'] = resultValidation.value;
    } else {
      issues.push({ field: 'Result', message: resultValidation.message, severity: 'error' });
      parsed['Result'] = tulemus;
    }

    parsed._issues = issues;
    parsed._needsReview = issues.some(i => i.severity === 'error');
    parsed._corrections = corrections;
    
    if (parsed._needsReview) {
      results.needsReview.push(parsed);
    } else {
      results.parsed.push(parsed);
    }
    
    if (corrections.length > 0) {
      results.corrections.push({ 
        recordId: row._id, 
        corrections: corrections,
        sourceFile: row._sourceFile || null
      });
    }
    
    results.logs.push(log);
  });

  // Apply hierarchical age classes to all parsed records
  results.parsed = applyHierarchicalAgeClasses(results.parsed);
  results.needsReview = applyHierarchicalAgeClasses(results.needsReview);

  return results;
}

// Simplified components
function Header({ sidebarCollapsed, setSidebarCollapsed }) {
  return (
    <header className="bg-white border-b h-16 flex items-center px-6 shadow-sm">
      <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-3 ml-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Archery Data Manager</h1>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ currentStep, setCurrentStep, sidebarCollapsed, stats }) {
  const items = [
    { step: 1, label: 'Import', icon: <Upload className="w-5 h-5" /> },
    { step: 2, label: 'Parse', icon: <Wand2 className="w-5 h-5" /> },
    { step: 3, label: 'Review', icon: <CheckSquare className="w-5 h-5" /> },
    { step: 4, label: 'Database', icon: <Database className="w-5 h-5" /> },
    { step: 5, label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { step: 6, label: 'Athletes', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className={`bg-white border-r transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.step}
            onClick={() => setCurrentStep(item.step)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              currentStep === item.step ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            {!sidebarCollapsed && <span className="text-sm font-medium">{item.step}. {item.label}</span>}
          </button>
        ))}
      </nav>
      {!sidebarCollapsed && (
        <div className="p-4 border-t space-y-2 text-sm">
          <div className="font-semibold text-gray-500 uppercase text-xs">Stats</div>
          <div className="flex justify-between"><span>Imported</span><span className="font-bold">{stats.imported}</span></div>
          <div className="flex justify-between"><span>Parsed</span><span className="font-bold">{stats.parsed}</span></div>
          <div className="flex justify-between"><span>Finalized</span><span className="font-bold">{stats.finalized}</span></div>
        </div>
      )}
    </aside>
  );
}

function MobileNavigation({ currentStep, setCurrentStep }) {
  const items = [
    { step: 1, label: 'Import', icon: <Upload className="w-5 h-5" /> },
    { step: 2, label: 'Parse', icon: <Wand2 className="w-5 h-5" /> },
    { step: 3, label: 'Review', icon: <CheckSquare className="w-5 h-5" /> },
    { step: 4, label: 'Database', icon: <Database className="w-5 h-5" /> },
    { step: 5, label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { step: 6, label: 'Athletes', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="flex">
      {items.map((item) => (
        <button
          key={item.step}
          onClick={() => setCurrentStep(item.step)}
          className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium border-b-2 transition-colors ${
            currentStep === item.step 
              ? 'border-blue-600 text-blue-600 bg-blue-50' 
              : 'border-transparent text-gray-600 hover:bg-gray-50'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ImportPage({ onImport, importedData, setCurrentStep }) {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);
  
  const handleFiles = (files) => {
    if (!files || files.length === 0) {
      setUploadError("No files selected. Please try again.");
      return;
    }
    
    setUploadError(null);
    const fileArray = Array.from(files);
    let allData = [];
    let allHeaders = null;
    let filesProcessed = 0;
    let fileNames = [];
    
    fileArray.forEach((file, fileIndex) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { headers, data } = parseCSV(e.target.result);
        
        // Track which file each record came from
        const dataWithSource = data.map(row => ({
          ...row,
          _sourceFile: file.name,
          _fileIndex: fileIndex
        }));
        
        allData = allData.concat(dataWithSource);
        fileNames.push(file.name);
        
        // Use headers from first file
        if (!allHeaders) {
          allHeaders = headers;
        }
        
        filesProcessed++;
        
        // When all files are processed
        if (filesProcessed === fileArray.length) {
          onImport({ 
            headers: allHeaders, 
            data: allData, 
            fileName: fileArray.length === 1 ? fileArray[0].name : `${fileArray.length} files`,
            fileNames: fileNames,
            fileCount: fileArray.length
          });
          setCurrentStep(2); // Auto-advance to Parse step
        }
      };
      reader.readAsText(file, 'UTF-8');
    });
  };

  const loadSampleData = () => {
    const sampleCSV = `Kuupäev,Sportlane,Võistlus,Klubi,Võistlusklass,Vanuserühm,Distants,Tulemus
15.12.2024,Kristjan Mäe,Tallinn Open,TLVK,Sportvibu Mehed,U21,2x18m,580
15.12.2024,Laura Nurmsalu,Tallinn Open,SAG,Plokkvibu Naised,+50,2x18m,645
16.12.2024,Mart Tamm,Tartu Cup,VVK,Vaistuvibu Mehed,,18m,520
16.12.2024,Kati Kask,Tartu Cup,STR,Sportvibu Naised,U18,18m,560`;
    
    const { headers, data } = parseCSV(sampleCSV);
    const dataWithSource = data.map((row, index) => ({
      ...row,
      _sourceFile: 'sample_data.csv',
      _fileIndex: 0
    }));
    
    onImport({ 
      headers, 
      data: dataWithSource, 
      fileName: 'sample_data.csv',
      fileNames: ['sample_data.csv'],
      fileCount: 1
    });
    setCurrentStep(2);
  }
  
  const loadAllCompetitions = () => {
    let allData = [];
    let allHeaders = null;
    let fileNames = [];
    
    Object.entries(ALL_COMPETITION_DATA).forEach(([filename, csvContent], fileIndex) => {
      const { headers, data } = parseCSV(csvContent);
      
      const dataWithSource = data.map(row => ({
        ...row,
        _sourceFile: filename,
        _fileIndex: fileIndex
      }));
      
      allData = allData.concat(dataWithSource);
      fileNames.push(filename);
      
      if (!allHeaders) {
        allHeaders = headers;
      }
    });
    
    const fileCount = Object.keys(ALL_COMPETITION_DATA).length;
    onImport({ 
      headers: allHeaders, 
      data: allData, 
      fileName: `${fileCount} competition files (${allData.length} records)`,
      fileNames: fileNames,
      fileCount: fileCount
    });
    setCurrentStep(2); // Use step number instead of 'parse'
  };;

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadError(null);
    
    if (fileInputRef.current) {
      try {
        fileInputRef.current.click();
        // Give feedback that we tried
        setTimeout(() => {
          if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
            console.log("File input opened");
          }
        }, 100);
      } catch (err) {
        setUploadError("Unable to open file picker. Please try using the desktop version.");
        console.error("File input error:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Import Data</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <input 
          ref={fileInputRef} 
          type="file" 
          accept=".csv" 
          multiple
          onChange={(e) => handleFiles(e.target.files)} 
          className="hidden" 
          id="file-upload-input"
        />
        
        {/* Desktop: Label with drag & drop */}
        <div className="hidden md:block">
          <label 
            htmlFor="file-upload-input"
            className="block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
          >
            <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Drop CSV file(s) here or click to browse</p>
            <p className="text-sm text-gray-500">Supports multiple files • Estonian characters (UTF-8)</p>
            <p className="text-xs text-gray-400 mt-2">Hold Ctrl/Cmd to select multiple files</p>
          </label>
          <button
            type="button"
            onClick={loadSampleData}
            className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 border border-gray-300"
          >
            📊 Or load sample data to test
          </button>
          <button
            type="button"
            onClick={loadAllCompetitions}
            className="mt-3 w-full px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 border border-green-700 shadow-sm"
          >
            🏆 Load All Competitions (17 files, real data)
          </button>
        </div>

        {/* Mobile: Explicit button */}
        <div className="md:hidden border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-base font-medium mb-3">Import CSV Files</p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-base hover:bg-blue-700 active:bg-blue-800 shadow-sm"
          >
            Choose Files
          </button>
          <p className="text-xs text-gray-500 mt-3">Supports multiple files • UTF-8</p>
          
          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {uploadError}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-left text-gray-700">
            <p className="font-semibold mb-1">📱 Mobile Note:</p>
            <p>If the file picker doesn't open, file uploads may not be supported in this view. Try:</p>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              <li>Opening in your mobile browser</li>
              <li>Using the desktop version</li>
              <li>Uploading files through the Claude app's attachment feature</li>
            </ul>
          </div>
          
          {/* Sample data option */}
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={loadSampleData}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 active:bg-gray-300 border border-gray-300"
            >
              📊 Load Sample Data to Test
            </button>
            <button
              type="button"
              onClick={loadAllCompetitions}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 active:bg-green-800 border border-green-700 shadow-sm"
            >
              🏆 Load All Competitions (17 files, real data)
            </button>
          </div>
        </div>
      </div>
      {importedData && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-3 mb-3">
            <FileSpreadsheet className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              {importedData.fileCount === 1 ? (
                <>
                  <p className="font-semibold text-lg">{importedData.fileName}</p>
                  <p className="text-sm text-gray-600">{importedData.data.length} rows imported</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg">{importedData.fileCount} files imported</p>
                  <p className="text-sm text-gray-600 mb-2">{importedData.data.length} total rows</p>
                  <div className="space-y-1 mt-3">
                    {importedData.fileNames.map((fileName, index) => {
                      const fileRecords = importedData.data.filter(r => r._fileIndex === index);
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{fileName}</span>
                          <span className="text-gray-500">({fileRecords.length} rows)</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          <button 
            onClick={() => setCurrentStep(2)} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Continue to Parse
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ParsePage({ importedData, onParse, parsedData, settings, onSettingsChange, setCurrentStep, addToDatabase }) {
  const [showSettings, setShowSettings] = useState(false);
  const [showAllCorrections, setShowAllCorrections] = useState(true);
  
  const handleParse = () => {
    const result = applyAdvancedParsing(importedData.data, settings, ['Kristjan Mäe', 'Laura Nurmsalu']);
    onParse(result);
    
    // Immediately add all valid (parsed) records to database
    if (result.parsed && result.parsed.length > 0) {
      console.log('Adding', result.parsed.length, 'valid records to database');
      addToDatabase(result.parsed);
      
      // Keep parsed records in parsedData for UI display
      // They're now in both parsedData.parsed (for display) and databaseRecords (for actual use)
    }
    
    // Stay on Parse page - don't navigate anywhere
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Parse Data</h2>
        <button onClick={() => setShowSettings(true)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
      {showSettings && <SettingsModal settings={settings} onSave={onSettingsChange} onClose={() => setShowSettings(false)} />}
      <div className="bg-white rounded-lg shadow p-6">
        {importedData ? (
          <button onClick={handleParse} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Apply Parsing
          </button>
        ) : (
          <p className="text-gray-500">Import data first</p>
        )}
      </div>
      
      {parsedData && (
        <>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Parsing Summary</h3>
              {importedData && importedData.fileCount > 1 && (
                <span className="text-sm text-gray-600">
                  {importedData.fileCount} files processed
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">Success</div>
                <div className="text-2xl font-bold text-green-900">{parsedData.parsed.length}</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-sm text-gray-600">Needs Review</div>
                <div className="text-2xl font-bold text-yellow-900">{parsedData.needsReview.length}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">Corrections</div>
                <div className="text-2xl font-bold text-blue-900">{parsedData.corrections.length}</div>
              </div>
            </div>
          </div>

          {/* Success indicator */}
          {parsedData.needsReview.length === 0 && parsedData.parsed.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">All Records Valid!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    {parsedData.parsed.length} record{parsedData.parsed.length !== 1 ? 's' : ''} added to database
                  </p>
                </div>
              </div>
            </div>
          )}

          {parsedData.corrections.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Data Corrections</h3>
                  <p className="text-sm text-gray-600">{parsedData.corrections.length} records corrected</p>
                </div>
                <button onClick={() => setShowAllCorrections(!showAllCorrections)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  {showAllCorrections ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showAllCorrections && (
                <div className="p-6">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {parsedData.corrections.map((record, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-sm text-gray-700">Record #{record.recordId}</div>
                          {record.sourceFile && (
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                              📄 {record.sourceFile}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          {record.corrections.map((correction, corrIdx) => (
                            <div key={corrIdx} className="flex items-center gap-3 text-sm bg-white p-3 rounded border">
                              <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{correction.field}</div>
                              <div className="flex-1 flex items-center gap-2">
                                <span className="text-red-600 line-through">{correction.original}</span>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <span className="text-green-600 font-medium">{correction.corrected}</span>
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" />
                                {correction.method}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Next Steps</h3>
                <p className="text-sm text-gray-600">
                  {parsedData.needsReview.length > 0 
                    ? `Review ${parsedData.needsReview.length} flagged record${parsedData.needsReview.length !== 1 ? 's' : ''} or proceed directly to database`
                    : 'All records are valid - proceed to database'}
                </p>
              </div>
              <div className="flex gap-3">
                {parsedData.needsReview.length > 0 && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Review Issues
                  </button>
                )}
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                  Continue to Database
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ADVANCED REVIEW PAGE WITH TICKETS
function ReviewPage({ parsedData, onApprove, onFinalize, settings }) {
  const [manualOverrides, setManualOverrides] = useState({});
  const [notification, setNotification] = useState(null);
  
  // Show notification temporarily
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Group records by individual issues - one ticket per unique issue
  const tickets = useMemo(() => {
    if (!parsedData || !parsedData.needsReview || parsedData.needsReview.length === 0) {
      return [];
    }
    
    const grouped = {};
    
    parsedData.needsReview.forEach(record => {
      // Create a separate ticket for EACH issue in the record
      record._issues.forEach(issue => {
        // Create a signature for this specific issue
        const issueSignature = `${issue.field}:${issue.message}`;
        
        if (!grouped[issueSignature]) {
          grouped[issueSignature] = {
            signature: issueSignature,
            issue: issue, // Single issue only
            records: [],
            recommendation: null
          };
        }
        
        // Add record to this issue group
        // Only add if not already present (in case record has duplicate issues)
        if (!grouped[issueSignature].records.some(r => r._id === record._id)) {
          grouped[issueSignature].records.push(record);
        }
      });
    });
    
    // Generate recommendations for each ticket
    return Object.values(grouped).map((ticket, index) => {
      const firstRecord = ticket.records[0];
      const recommendation = generateRecommendation(ticket.issue, firstRecord, settings);
      
      return {
        ...ticket,
        ticketId: index + 1,
        recommendation: recommendation
      };
    });
  }, [parsedData, settings]);

  const handleAcceptTicket = (ticket) => {
    const override = manualOverrides[`${ticket.ticketId}-${ticket.records[0]._id}`];
    const correctionValue = override || (ticket.recommendation ? ticket.recommendation.value : null);
    
    if (!correctionValue) {
      alert('Please enter a manual correction value before accepting this ticket.');
      return;
    }
    
    ticket.records.forEach(record => {
      // Apply correction to the single issue field
      record[ticket.issue.field] = correctionValue;
      
      // Remove this specific issue from the record's issues list
      record._issues = record._issues.filter(i => 
        !(i.field === ticket.issue.field && i.message === ticket.issue.message)
      );
      
      // If no more issues, mark as no longer needing review
      if (record._issues.length === 0) {
        record._needsReview = false;
      }
      
      onApprove(record);
    });
    
    // Show notification
    showNotification(`✓ ${ticket.records.length} record${ticket.records.length > 1 ? 's' : ''} added to database`);
  };

  const handleDeleteTicket = (ticket) => {
    if (confirm(`Delete ${ticket.records.length} records from this ticket?`)) {
      // Remove records from needsReview
      ticket.records.forEach(record => {
        const index = parsedData.needsReview.indexOf(record);
        if (index > -1) {
          parsedData.needsReview.splice(index, 1);
        }
      });
      alert(`Deleted ${ticket.records.length} records`);
    }
  };

  if (!parsedData || parsedData.needsReview.length === 0) {
    // Auto-finalize valid records if any exist
    React.useEffect(() => {
      if (parsedData && parsedData.parsed.length > 0) {
        // Add all parsed records to database automatically
        parsedData.parsed.forEach(record => {
          onApprove(record);
        });
        // Clear parsed array since they're now in database
        parsedData.parsed = [];
      }
    }, []);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Manual Review</h2>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <CheckSquare className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-lg font-medium">All records parsed successfully!</p>
          <p className="text-gray-600 mt-2">Valid records automatically added to database</p>
          <button 
            onClick={() => onFinalize()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue to Database →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
          <CheckSquare className="w-5 h-5" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold">Manual Review</h2>
        <p className="text-gray-600">{tickets.length} correction{tickets.length !== 1 ? 's' : ''} needed, {parsedData.needsReview.length} total records affected</p>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
            <div className="p-6">
              {/* Ticket Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                      Ticket #{ticket.ticketId}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {ticket.issue.field}
                    </span>
                    <span className="text-sm text-gray-600">
                      {ticket.records.length} record{ticket.records.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {/* Single Issue Display */}
                  <div className="mb-4">
                    {(() => {
                      const issue = ticket.issue;
                      // Get the original problematic value
                      const originalValue = ticket.records[0]._originalData[issue.field] || 
                                          ticket.records[0]._originalData[issue.field.replace(' ', '')] ||
                                          // Try common field mappings
                                          (issue.field === 'Club' ? ticket.records[0]._originalData['Klubi'] : null) ||
                                          (issue.field === 'Date' ? ticket.records[0]._originalData['Kuupäev'] : null) ||
                                          (issue.field === 'Competition' ? ticket.records[0]._originalData['Võistlus'] : null) ||
                                          (issue.field === 'Result' ? ticket.records[0]._originalData['Tulemus'] : null) ||
                                          (issue.field === 'Distance' || issue.field === 'Shooting Exercise' ? ticket.records[0]._originalData['Distants'] : null) ||
                                          (issue.field === 'Class' || issue.field === 'Bow Type' || issue.field === 'Age Class' || issue.field === 'Gender' ? ticket.records[0]._originalData['Võistlusklass'] : null);
                      
                      return (
                        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
                          <div className="flex items-start gap-3">
                            <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${issue.severity === 'error' ? 'text-red-500' : 'text-yellow-500'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-gray-900 text-lg">{issue.field}</span>
                                <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs font-semibold uppercase">
                                  {issue.severity}
                                </span>
                              </div>
                              <div className="text-gray-700 mb-3">
                                {issue.message}
                              </div>
                              {originalValue && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Original value:</span>
                                  <span className="text-red-700 font-mono font-bold bg-red-100 px-3 py-1.5 rounded border-2 border-red-300 text-base">
                                    {originalValue}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Sample Record */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Sample Record (ID: {ticket.records[0]._id})</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(ticket.records[0]._originalData).slice(0, 6).map(([key, value]) => {
                    // Check if this field matches the single issue
                    const hasIssue = key === ticket.issue.field || 
                                   key.replace(/[äöüõ]/g, c => ({ä:'a',ö:'o',ü:'u',õ:'o'}[c] || c)) === ticket.issue.field ||
                                   (ticket.issue.field === 'Club' && key === 'Klubi') ||
                                   (ticket.issue.field === 'Date' && key === 'Kuupäev') ||
                                   (ticket.issue.field === 'Competition' && key === 'Võistlus') ||
                                   (ticket.issue.field === 'Result' && key === 'Tulemus') ||
                                   ((ticket.issue.field === 'Distance' || ticket.issue.field === 'Shooting Exercise') && key === 'Distants') ||
                                   ((ticket.issue.field === 'Class' || ticket.issue.field === 'Bow Type' || ticket.issue.field === 'Age Class' || ticket.issue.field === 'Gender') && key === 'Võistlusklass');
                    
                    return (
                      <div key={key} className={hasIssue ? 'p-2 bg-red-50 rounded border-2 border-red-300' : ''}>
                        <span className="text-gray-600 font-medium">{key}:</span>{' '}
                        <span className={hasIssue ? 'text-red-700 font-bold' : 'text-gray-900'}>
                          {value || '-'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendation or No Match */}
              {ticket.recommendation ? (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Recommended from Settings</span>
                    <span className="text-xs text-blue-700 px-2 py-1 bg-blue-100 rounded">
                      {ticket.recommendation.confidence}% match
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-700">Source:</span>
                    <span className="text-sm font-medium text-blue-900">{ticket.recommendation.method}</span>
                  </div>
                  <div className="mt-2 p-3 bg-white rounded border border-blue-200">
                    <span className="text-sm font-mono font-semibold text-green-700">{ticket.recommendation.value}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                    <CheckSquare className="w-3 h-3" />
                    This value exists in your parsing settings
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-900">No Match in Settings</span>
                  </div>
                  <p className="text-sm text-yellow-800">
                    No matching value found in your parsing settings list. Please enter a correction manually or add this value to your settings.
                  </p>
                </div>
              )}

              {/* Manual Override */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Manual Override for "{ticket.issue.field}" (applies to all {ticket.records.length} records)
                </label>
                <input
                  type="text"
                  placeholder={`Enter correction value for ${ticket.issue.field}...`}
                  value={manualOverrides[`${ticket.ticketId}-${ticket.records[0]._id}`] || ''}
                  onChange={(e) => {
                    const newOverrides = { ...manualOverrides };
                    ticket.records.forEach(record => {
                      newOverrides[`${ticket.ticketId}-${record._id}`] = e.target.value;
                    });
                    setManualOverrides(newOverrides);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteTicket(ticket)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Group ({ticket.records.length})
                </button>
                
                <button
                  onClick={() => handleAcceptTicket(ticket)}
                  disabled={!ticket.recommendation && !manualOverrides[`${ticket.ticketId}-${ticket.records[0]._id}`]}
                  className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium ${
                    !ticket.recommendation && !manualOverrides[`${ticket.ticketId}-${ticket.records[0]._id}`]
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Check className="w-5 h-5" />
                  Add to Database
                  {!ticket.recommendation && !manualOverrides[`${ticket.ticketId}-${ticket.records[0]._id}`] && (
                    <span className="text-xs">(Enter value first)</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Total records needing review</div>
            <div className="text-2xl font-bold text-gray-900">{parsedData.needsReview.length}</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onFinalize()}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
            >
              <SkipForward className="w-5 h-5" />
              Skip to Database
            </button>
            <button
              onClick={() => onFinalize()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              Continue to Database
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DatabasePage({ databaseRecords, onAthleteClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [seasonalBest, setSeasonalBest] = useState(false);
  
  // Lazy loading states
  const [displayCount, setDisplayCount] = useState(100); // Show first 100 records
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const tableContainerRef = useRef(null);
  
  // Filter states
  const [filterClub, setFilterClub] = useState('');
  const [filterCompetition, setFilterCompetition] = useState('');
  const [filterBowType, setFilterBowType] = useState('');
  const [filterAgeClass, setFilterAgeClass] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterDistance, setFilterDistance] = useState('');
  const [filterSourceFile, setFilterSourceFile] = useState('');
  
  // Check if multiple files were imported
  const hasMultipleFiles = useMemo(() => {
    const uniqueFiles = new Set(databaseRecords.map(r => r._sourceFile).filter(f => f));
    return uniqueFiles.size > 1;
  }, [databaseRecords]);
  
  const sourceFiles = useMemo(() => {
    if (!hasMultipleFiles) return [];
    const files = {};
    databaseRecords.forEach(r => {
      if (r._sourceFile) {
        files[r._sourceFile] = (files[r._sourceFile] || 0) + 1;
      }
    });
    return Object.entries(files)
      .sort((a, b) => b[1] - a[1])
      .map(([file, count]) => ({ value: file, count }));
  }, [databaseRecords, hasMultipleFiles]);

  // Get unique values with counts for dropdowns
  const getUniqueValuesWithCount = (field) => {
    const counts = {};
    databaseRecords.forEach(record => {
      const value = record[field] || (field === 'Age Class' ? 'Adult' : '');
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    
    // Sort by count (descending)
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
  };

  // Get available distances based on current filters
  const getAvailableDistances = () => {
    // First apply all filters EXCEPT distance
    let filtered = databaseRecords;
    
    if (filterClub) {
      filtered = filtered.filter(r => r.Club === filterClub);
    }
    if (filterCompetition) {
      filtered = filtered.filter(r => r.Competition === filterCompetition);
    }
    if (filterBowType) {
      filtered = filtered.filter(r => r['Bow Type'] === filterBowType);
    }
    if (filterAgeClass) {
      const ageValue = filterAgeClass === 'Adult' ? '' : filterAgeClass;
      // Check if the filter age class is in the record's Age Classes array
      filtered = filtered.filter(r => {
        const ageClasses = r['Age Classes'] || [r['Age Class'] || ''];
        return ageClasses.includes(ageValue);
      });
    }
    if (filterGender) {
      filtered = filtered.filter(r => r.Gender === filterGender);
    }
    
    // Now count distances in the filtered set
    const counts = {};
    filtered.forEach(record => {
      const value = record['Shooting Exercise'];
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
  };

  // Apply all filters
  const filteredRecords = useMemo(() => {
    let filtered = databaseRecords;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(record => {
        return (
          (record._id?.toString() || '').toLowerCase().includes(term) ||
          (record.Athlete || '').toLowerCase().includes(term) ||
          (record.Club || '').toLowerCase().includes(term) ||
          (record.Competition || '').toLowerCase().includes(term) ||
          (record['Bow Type'] || '').toLowerCase().includes(term) ||
          (record['Age Class'] || '').toLowerCase().includes(term) ||
          (record.Gender || '').toLowerCase().includes(term) ||
          (record['Shooting Exercise'] || '').toLowerCase().includes(term) ||
          (record.Result?.toString() || '').toLowerCase().includes(term) ||
          (record.Date || '').toLowerCase().includes(term)
        );
      });
    }
    
    // Dropdown filters
    if (filterClub) {
      filtered = filtered.filter(r => r.Club === filterClub);
    }
    if (filterCompetition) {
      filtered = filtered.filter(r => r.Competition === filterCompetition);
    }
    if (filterBowType) {
      filtered = filtered.filter(r => r['Bow Type'] === filterBowType);
    }
    if (filterAgeClass) {
      const ageValue = filterAgeClass === 'Adult' ? '' : filterAgeClass;
      // Check if the filter age class is in the record's Age Classes array
      filtered = filtered.filter(r => {
        const ageClasses = r['Age Classes'] || [r['Age Class'] || ''];
        return ageClasses.includes(ageValue);
      });
    }
    if (filterGender) {
      filtered = filtered.filter(r => r.Gender === filterGender);
    }
    if (filterDistance) {
      filtered = filtered.filter(r => r['Shooting Exercise'] === filterDistance);
    }
    if (filterSourceFile) {
      filtered = filtered.filter(r => r._sourceFile === filterSourceFile);
    }
    
    // Seasonal Best filter - keep only highest result per athlete per distance
    if (seasonalBest) {
      const grouped = {};
      
      filtered.forEach(record => {
        const key = `${record.Athlete}|${record['Shooting Exercise']}|${record['Bow Type']}|${record['Age Class']}|${record.Gender}`;
        
        if (!grouped[key]) {
          grouped[key] = record;
        } else {
          // Keep the record with higher result
          const currentResult = parseFloat(record.Result) || 0;
          const groupedResult = parseFloat(grouped[key].Result) || 0;
          
          if (currentResult > groupedResult) {
            grouped[key] = record;
          }
        }
      });
      
      filtered = Object.values(grouped);
    }
    
    return filtered;
  }, [databaseRecords, searchTerm, filterClub, filterCompetition, filterBowType, filterAgeClass, filterGender, filterDistance, filterSourceFile, seasonalBest]);

  // Sort records
  const sortedRecords = useMemo(() => {
    const sorted = [...filteredRecords];
    
    sorted.sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      
      if (sortColumn === 'Result') {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      if (sortColumn === '_id') {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      // Special sorting for Age Class - use priority order
      if (sortColumn === 'Age Class') {
        const aPriority = AGE_CLASS_PRIORITY.indexOf(aVal || '');
        const bPriority = AGE_CLASS_PRIORITY.indexOf(bVal || '');
        return sortDirection === 'asc' ? aPriority - bPriority : bPriority - aPriority;
      }
      
      aVal = (aVal || '').toString().toLowerCase();
      bVal = (bVal || '').toString().toLowerCase();
      
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
    
    return sorted;
  }, [filteredRecords, sortColumn, sortDirection]);

  // Lazy loading - only display first N records
  const displayedRecords = useMemo(() => {
    return sortedRecords.slice(0, displayCount);
  }, [sortedRecords, displayCount]);

  const hasMoreRecords = sortedRecords.length > displayCount;

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(100);
  }, [searchTerm, filterClub, filterCompetition, filterBowType, filterAgeClass, filterGender, filterDistance, filterSourceFile, seasonalBest]);

  // Handle scroll to load more
  const handleScroll = (e) => {
    const element = e.target;
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    console.log('Scroll:', { scrollHeight, scrollTop, clientHeight, distanceFromBottom, hasMoreRecords, isLoadingMore });

    // If scrolled to within 300px of bottom OR at the very bottom, load more
    if ((distanceFromBottom < 300 || distanceFromBottom <= 1) && !isLoadingMore && hasMoreRecords) {
      console.log('Loading more records...');
      setIsLoadingMore(true);
      
      // Simulate loading delay (smooth UX)
      setTimeout(() => {
        setDisplayCount(prev => {
          const newCount = prev + 100;
          console.log('Display count increased to:', newCount);
          return newCount;
        });
        setIsLoadingMore(false);
      }, 100);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterClub('');
    setFilterCompetition('');
    setFilterBowType('');
    setFilterAgeClass('');
    setFilterGender('');
    setFilterDistance('');
    setFilterSourceFile('');
    setSeasonalBest(false);
  };

  const activeFiltersCount = [filterClub, filterCompetition, filterBowType, filterAgeClass, filterGender, filterDistance, filterSourceFile].filter(f => f).length;

  // Color coding helpers
  const getBowTypeColor = (bowType) => {
    const colors = {
      'Recurve': 'bg-blue-100 text-blue-800 border-blue-200',
      'Compound': 'bg-purple-100 text-purple-800 border-purple-200',
      'Barebow': 'bg-amber-100 text-amber-800 border-amber-200',
      'Longbow': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[bowType] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAgeClassColor = (ageClass) => {
    const colors = {
      'U13': 'bg-pink-100 text-pink-800 border-pink-200',
      'U15': 'bg-rose-100 text-rose-800 border-rose-200',
      'U18': 'bg-orange-100 text-orange-800 border-orange-200',
      'U21': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      '': 'bg-slate-100 text-slate-800 border-slate-200', // Adult
      '+50': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      '+60': 'bg-teal-100 text-teal-800 border-teal-200',
      '+70': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[ageClass || ''] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronRight className="w-4 h-4 text-blue-600 rotate-90" />
      : <ChevronRight className="w-4 h-4 text-blue-600 -rotate-90" />;
  };

  const clubOptions = getUniqueValuesWithCount('Club');
  const competitionOptions = getUniqueValuesWithCount('Competition');
  const bowTypeOptions = getUniqueValuesWithCount('Bow Type');
  const ageClassOptions = getUniqueValuesWithCount('Age Class');
  const genderOptions = getUniqueValuesWithCount('Gender');
  const distanceOptions = getAvailableDistances();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database</h2>
          <p className="text-gray-600">{databaseRecords.length} total records</p>
        </div>
        
        {/* Seasonal Best Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2 border border-gray-200">
          <input
            type="checkbox"
            id="seasonalBest"
            checked={seasonalBest}
            onChange={(e) => setSeasonalBest(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="seasonalBest" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
            Seasonal Best Only
          </label>
          {seasonalBest && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
              ON
            </span>
          )}
        </div>
      </div>

      {/* Hierarchical Age Class Info Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-purple-900 mb-1">Smart Age Class Filtering Active</h3>
            <p className="text-xs text-purple-800">
              Athletes are automatically tagged with their primary age class (lowest for youth, highest for seniors). 
              When filtering, results intelligently include hierarchical matches. For example: filtering by "U18" also shows U15 and U13 athletes, 
              since they can compete in U18 categories. This ensures complete and fair rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Compact Filters & Search */}
      <div className="bg-white rounded-lg shadow p-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-2">
          {/* Search - takes full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-sm focus:outline-none min-w-0"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Club Filter */}
          <div>
            <select
              value={filterClub}
              onChange={(e) => setFilterClub(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Clubs</option>
              {clubOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Competition Filter */}
          <div>
            <select
              value={filterCompetition}
              onChange={(e) => setFilterCompetition(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Competitions</option>
              {competitionOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Bow Type Filter */}
          <div>
            <select
              value={filterBowType}
              onChange={(e) => setFilterBowType(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Bow Types</option>
              {bowTypeOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Age Class Filter */}
          <div>
            <select
              value={filterAgeClass}
              onChange={(e) => setFilterAgeClass(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Age Classes</option>
              {ageClassOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Genders</option>
              {genderOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Distance Filter */}
          <div>
            <select
              value={filterDistance}
              onChange={(e) => setFilterDistance(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={distanceOptions.length === 0 && activeFiltersCount > 0}
            >
              <option value="">All Distances</option>
              {distanceOptions.map(({ value, count }) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {/* Source File Filter (only show if multiple files) */}
          {hasMultipleFiles ? (
            <div>
              <select
                value={filterSourceFile}
                onChange={(e) => setFilterSourceFile(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Files</option>
                {sourceFiles.map(({ value, count }) => (
                  <option key={value} value={value}>
                    📄 {value.length > 20 ? value.substring(0, 20) + '...' : value} ({count})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {(activeFiltersCount > 0 || seasonalBest) && (
                  <>
                    <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs text-gray-600 truncate">
                      {filteredRecords.length} of {databaseRecords.length}
                      {seasonalBest && ' (best)'}
                    </span>
                  </>
                )}
              </div>
              {(activeFiltersCount > 0 || seasonalBest) && (
                <button
                  onClick={clearAllFilters}
                  className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap flex-shrink-0"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Status row - only show if multiple files present */}
        {hasMultipleFiles && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {(activeFiltersCount > 0 || seasonalBest || filterSourceFile) && (
                <>
                  <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600 truncate">
                    {filteredRecords.length} of {databaseRecords.length}
                    {seasonalBest && ' (best)'}
                  </span>
                </>
              )}
            </div>
            {(activeFiltersCount > 0 || seasonalBest || filterSourceFile) && (
              <button
                onClick={clearAllFilters}
                className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap flex-shrink-0"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table - Desktop View */}
      <div className="bg-white rounded-lg shadow overflow-hidden hidden md:block">
        {seasonalBest && displayedRecords.length > 0 && (
          <div className="px-3 py-2 bg-blue-50 border-b border-blue-200 text-sm text-blue-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">
              Showing seasonal best scores only — one result per athlete per distance combination
            </span>
          </div>
        )}
        {displayedRecords.length > 0 ? (
          <div 
            className="overflow-x-auto max-h-[600px] overflow-y-auto" 
            onScroll={handleScroll}
            ref={tableContainerRef}
          >
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('_id')}
                  >
                    <div className="flex items-center gap-1">
                      ID
                      <SortIcon column="_id" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Date')}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <SortIcon column="Date" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Athlete')}
                  >
                    <div className="flex items-center gap-1">
                      Athlete
                      <SortIcon column="Athlete" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Club')}
                  >
                    <div className="flex items-center gap-1">
                      Club
                      <SortIcon column="Club" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Competition')}
                  >
                    <div className="flex items-center gap-1">
                      Competition
                      <SortIcon column="Competition" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Bow Type')}
                  >
                    <div className="flex items-center gap-1">
                      Bow
                      <SortIcon column="Bow Type" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Age Class')}
                  >
                    <div className="flex items-center gap-1">
                      Age
                      <SortIcon column="Age Class" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Gender')}
                  >
                    <div className="flex items-center gap-1">
                      Gender
                      <SortIcon column="Gender" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Shooting Exercise')}
                  >
                    <div className="flex items-center gap-1">
                      Dist
                      <SortIcon column="Shooting Exercise" />
                    </div>
                  </th>
                  <th 
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('Result')}
                  >
                    <div className="flex items-center gap-1">
                      Result
                      <SortIcon column="Result" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                      #{record._id}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {record.Date || '-'}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900 font-medium">
                      <button
                        onClick={() => onAthleteClick && onAthleteClick(record.Athlete)}
                        className="hover:text-blue-600 hover:underline cursor-pointer"
                      >
                        {record.Athlete || '-'}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700">
                      {record.Club || '-'}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700">
                      {record.Competition || '-'}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getBowTypeColor(record['Bow Type'])}`}>
                        {record['Bow Type'] || '-'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getAgeClassColor(record['Age Class'])}`}>
                        {record['Age Class'] || 'Adult'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        record.Gender === 'Men' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {record.Gender || '-'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {record['Shooting Exercise'] || '-'}
                    </td>
                    <td className="px-3 py-2 text-sm font-bold text-gray-900">
                      {record.Result !== null && record.Result !== undefined ? record.Result : '-'}
                    </td>
                  </tr>
                ))}
                {/* Loading indicator */}
                {isLoadingMore && (
                  <tr>
                    <td colSpan="10" className="px-3 py-4 text-center text-sm text-gray-500">
                      <RefreshCw className="w-4 h-4 animate-spin inline-block mr-2" />
                      Loading more records...
                    </td>
                  </tr>
                )}
                {/* Load More button */}
                {!isLoadingMore && hasMoreRecords && (
                  <tr>
                    <td colSpan="10" className="px-3 py-4 text-center bg-gray-50">
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          Showing {displayedRecords.length} of {sortedRecords.length} records
                        </div>
                        <button
                          onClick={() => {
                            setIsLoadingMore(true);
                            setTimeout(() => {
                              setDisplayCount(prev => prev + 100);
                              setIsLoadingMore(false);
                            }, 100);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Load 100 More Records
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              {databaseRecords.length === 0 
                ? 'No records in database yet' 
                : 'No records match your filters'}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Table View */}
      <div className="md:hidden bg-white rounded-lg shadow overflow-hidden">
        {seasonalBest && displayedRecords.length > 0 && (
          <div className="px-3 py-2 bg-blue-50 border-b border-blue-200 text-xs text-blue-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">
              Showing seasonal best scores only
            </span>
          </div>
        )}
        {displayedRecords.length > 0 ? (
          <div 
            className="max-h-[600px] overflow-y-auto"
            onScroll={handleScroll}
          >
            <table className="w-full text-xs table-fixed">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* Column 1: Athlete - 25% */}
                  <th 
                    className="w-1/4 px-1.5 py-2 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                    onClick={() => handleSort('Athlete')}
                  >
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] leading-tight">Athlete</span>
                      <SortIcon column="Athlete" />
                    </div>
                  </th>
                  {/* Column 2: Club + Competition - 30% */}
                  <th className="w-[30%] px-1.5 py-2 text-left font-semibold text-gray-700">
                    <div className="space-y-0.5">
                      <button 
                        onClick={() => handleSort('Club')}
                        className="flex items-center gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Club</span>
                        <SortIcon column="Club" />
                      </button>
                      <button 
                        onClick={() => handleSort('Competition')}
                        className="flex items-center gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Event</span>
                        <SortIcon column="Competition" />
                      </button>
                    </div>
                  </th>
                  {/* Column 3: Bow + Gender + Age - 25% */}
                  <th className="w-1/4 px-1.5 py-2 text-left font-semibold text-gray-700">
                    <div className="space-y-0.5">
                      <button 
                        onClick={() => handleSort('Bow Type')}
                        className="flex items-center gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Bow</span>
                        <SortIcon column="Bow Type" />
                      </button>
                      <button 
                        onClick={() => handleSort('Gender')}
                        className="flex items-center gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Gender</span>
                        <SortIcon column="Gender" />
                      </button>
                      <button 
                        onClick={() => handleSort('Age Class')}
                        className="flex items-center gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Age</span>
                        <SortIcon column="Age Class" />
                      </button>
                    </div>
                  </th>
                  {/* Column 4: Distance + Result - 20% */}
                  <th className="w-1/5 px-1.5 py-2 text-right font-semibold text-gray-700">
                    <div className="space-y-0.5">
                      <button 
                        onClick={() => handleSort('Shooting Exercise')}
                        className="flex items-center justify-end gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Dist</span>
                        <SortIcon column="Shooting Exercise" />
                      </button>
                      <button 
                        onClick={() => handleSort('Result')}
                        className="flex items-center justify-end gap-0.5 hover:text-blue-600 active:text-blue-800 w-full"
                      >
                        <span className="text-[10px] leading-tight">Score</span>
                        <SortIcon column="Result" />
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {displayedRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 active:bg-gray-100">
                    {/* Column 1: Athlete */}
                    <td className="px-1.5 py-2 align-top">
                      <button
                        onClick={() => onAthleteClick && onAthleteClick(record.Athlete)}
                        className="font-semibold text-gray-900 text-[11px] leading-tight break-words hover:text-blue-600 hover:underline text-left"
                      >
                        {record.Athlete || '-'}
                      </button>
                    </td>
                    {/* Column 2: Club + Competition */}
                    <td className="px-1.5 py-2 align-top">
                      <div className="space-y-0.5">
                        <div className="text-gray-900 font-medium text-[10px] leading-tight line-clamp-2 break-words">
                          {record.Club || '-'}
                        </div>
                        <div className="text-gray-600 text-[9px] leading-tight line-clamp-2 break-words">
                          {record.Competition || '-'}
                        </div>
                      </div>
                    </td>
                    {/* Column 3: Bow + Gender + Age */}
                    <td className="px-1.5 py-2 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className={`px-1 py-0.5 rounded text-[9px] font-medium border ${getBowTypeColor(record['Bow Type'])} leading-none truncate`}>
                          {record['Bow Type'] || '-'}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-[9px] font-medium leading-none truncate ${
                          record.Gender === 'Men' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                        }`}>
                          {record.Gender || '-'}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-[9px] font-medium border ${getAgeClassColor(record['Age Class'])} leading-none truncate`}>
                          {record['Age Class'] || 'Adult'}
                        </span>
                      </div>
                    </td>
                    {/* Column 4: Distance + Result */}
                    <td className="px-1.5 py-2 text-right align-top">
                      <div className="space-y-1">
                        <div className="text-gray-700 font-medium text-[10px] leading-tight whitespace-nowrap">
                          {record['Shooting Exercise'] || '-'}
                        </div>
                        <div className="text-sm font-bold text-gray-900 leading-tight">
                          {record.Result !== null && record.Result !== undefined ? record.Result : '-'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Loading indicator */}
                {isLoadingMore && (
                  <tr>
                    <td colSpan="4" className="px-3 py-4 text-center text-xs text-gray-500">
                      <RefreshCw className="w-4 h-4 animate-spin inline-block mr-2" />
                      Loading...
                    </td>
                  </tr>
                )}
                {/* Load More button */}
                {!isLoadingMore && hasMoreRecords && (
                  <tr>
                    <td colSpan="4" className="px-3 py-4 text-center bg-gray-50">
                      <div className="space-y-2">
                        <div className="text-[10px] text-gray-500">
                          {displayedRecords.length} of {sortedRecords.length} records
                        </div>
                        <button
                          onClick={() => {
                            setIsLoadingMore(true);
                            setTimeout(() => {
                              setDisplayCount(prev => prev + 100);
                              setIsLoadingMore(false);
                            }, 100);
                          }}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Load 100 More
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              {databaseRecords.length === 0 
                ? 'No records in database yet' 
                : 'No records match your filters'}
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      {databaseRecords.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-xs text-gray-600">Total Records</div>
            <div className="text-xl font-bold text-gray-900">{databaseRecords.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-xs text-gray-600">Unique Athletes</div>
            <div className="text-xl font-bold text-gray-900">
              {new Set(databaseRecords.map(r => r.Athlete)).size}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-xs text-gray-600">Unique Clubs</div>
            <div className="text-xl font-bold text-gray-900">
              {new Set(databaseRecords.map(r => r.Club)).size}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-xs text-gray-600">Competitions</div>
            <div className="text-xl font-bold text-gray-900">
              {new Set(databaseRecords.map(r => r.Competition)).size}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AthletePage({ databaseRecords, selectedAthlete, setSelectedAthlete }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique athletes
  const athletes = useMemo(() => {
    return [...new Set(databaseRecords.map(r => r.Athlete))].sort();
  }, [databaseRecords]);

  // Filter athletes by search
  const filteredAthletes = athletes.filter(athlete => 
    athlete.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get athlete data
  const athleteData = useMemo(() => {
    if (!selectedAthlete) return null;

    const records = databaseRecords.filter(r => r.Athlete === selectedAthlete);
    
    if (records.length === 0) return null;

    // Get general info from most recent record
    const mostRecent = records.sort((a, b) => {
      const dateA = a.Date.split('.').reverse().join('');
      const dateB = b.Date.split('.').reverse().join('');
      return dateB.localeCompare(dateA);
    })[0];

    // Group by distance
    const byDistance = {};
    records.forEach(record => {
      const distance = record['Shooting Exercise'];
      if (!byDistance[distance]) {
        byDistance[distance] = [];
      }
      byDistance[distance].push(record);
    });

    // Calculate stats for each distance
    const distanceStats = Object.entries(byDistance).map(([distance, distRecords]) => {
      // Sort by result (descending)
      const sorted = [...distRecords].sort((a, b) => (b.Result || 0) - (a.Result || 0));
      
      const best = sorted[0].Result;
      const top3 = sorted.slice(0, 3);
      const avgTop3 = top3.reduce((sum, r) => sum + (r.Result || 0), 0) / top3.length;

      // Sort by date for timeline
      const timeline = [...distRecords].sort((a, b) => {
        const dateA = a.Date.split('.').reverse().join('');
        const dateB = b.Date.split('.').reverse().join('');
        return dateA.localeCompare(dateB);
      });

      // Handle date collisions for chart visualization
      const chartData = [];
      const dateOffsets = {};
      
      timeline.forEach(record => {
        const date = record.Date;
        
        // Track how many records we've seen for this date
        if (!dateOffsets[date]) {
          dateOffsets[date] = 0;
        } else {
          dateOffsets[date]++;
        }

        // Parse date
        const [day, month, year] = date.split('.');
        const dateObj = new Date(year, month - 1, day);
        
        // Add offset in days for visualization (not changing actual data)
        dateObj.setDate(dateObj.getDate() + dateOffsets[date]);
        
        chartData.push({
          date: date, // Original date for display
          timestamp: dateObj.getTime(), // For calculations
          displayDate: dateObj.toISOString().split('T')[0], // For chart x-axis
          result: record.Result,
          competition: record.Competition,
          bowType: record['Bow Type'],
          ageClass: record['Age Class'] || 'Adult'
        });
      });

      // Calculate logarithmic regression (a*ln(x) + b) for trend line
      let trendData = [];
      if (chartData.length > 2) {
        // Convert timestamps to x values (days from first date, +1 to avoid ln(0))
        const firstTimestamp = chartData[0].timestamp;
        const dataPoints = chartData.map(d => ({
          x: (d.timestamp - firstTimestamp) / (1000 * 60 * 60 * 24) + 1, // days from start (starting at 1)
          y: d.result
        }));

        // Calculate logarithmic regression coefficients using least squares
        // y = a*ln(x) + b
        const n = dataPoints.length;
        let sumLnX = 0, sumY = 0, sumLnX2 = 0, sumYLnX = 0;

        dataPoints.forEach(p => {
          const lnX = Math.log(p.x);
          sumLnX += lnX;
          sumY += p.y;
          sumLnX2 += lnX * lnX;
          sumYLnX += p.y * lnX;
        });

        // Solve system of equations for a and b
        // a*Σ(ln(x)²) + b*Σ(ln(x)) = Σ(y*ln(x))
        // a*Σ(ln(x)) + b*n = Σ(y)

        const denominator = (n * sumLnX2) - (sumLnX * sumLnX);
        
        if (Math.abs(denominator) > 0.0001) {
          const a = (n * sumYLnX - sumY * sumLnX) / denominator;
          const b = (sumY - a * sumLnX) / n;

          // Generate trend line points
          trendData = chartData.map(d => {
            const x = (d.timestamp - firstTimestamp) / (1000 * 60 * 60 * 24) + 1;
            const trendValue = a * Math.log(x) + b;
            return {
              displayDate: d.displayDate,
              trend: trendValue
            };
          });
        }
      }

      // Merge trend data with chart data
      const chartDataWithTrend = chartData.map((d, i) => ({
        ...d,
        trend: trendData[i]?.trend || null
      }));

      return {
        distance,
        best,
        avgTop3: avgTop3.toFixed(1),
        count: distRecords.length,
        records: sorted,
        chartData: chartDataWithTrend,
        showChart: distRecords.length > 5
      };
    });

    // Sort distances (longest first, with 2x variants prioritized)
    distanceStats.sort((a, b) => {
      const getVal = (d) => {
        const match = d.distance.match(/(\d+)m/);
        return match ? parseInt(match[1]) : 0;
      };
      return getVal(b) - getVal(a);
    });

    return {
      name: selectedAthlete,
      club: mostRecent.Club,
      totalResults: records.length,
      competitions: new Set(records.map(r => r.Competition)).size,
      bowTypes: [...new Set(records.map(r => r['Bow Type']))],
      ageClasses: [...new Set(records.map(r => r['Age Class'] || 'Adult'))],
      distanceStats
    };
  }, [selectedAthlete, databaseRecords]);

  const getBowTypeColor = (bowType) => {
    const colors = {
      'Recurve': 'bg-blue-100 text-blue-800 border-blue-200',
      'Compound': 'bg-purple-100 text-purple-800 border-purple-200',
      'Barebow': 'bg-amber-100 text-amber-800 border-amber-200',
      'Longbow': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[bowType] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAgeClassColor = (ageClass) => {
    const colors = {
      'U13': 'bg-pink-100 text-pink-800 border-pink-200',
      'U15': 'bg-rose-100 text-rose-800 border-rose-200',
      'U18': 'bg-orange-100 text-orange-800 border-orange-200',
      'U21': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Adult': 'bg-slate-100 text-slate-800 border-slate-200',
      '+50': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      '+60': 'bg-teal-100 text-teal-800 border-teal-200',
      '+70': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[ageClass] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Athlete Statistics</h2>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an athlete..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {searchTerm && (
          <div className="mt-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map((athlete, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedAthlete(athlete);
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-gray-900">{athlete}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">No athletes found</div>
            )}
          </div>
        )}
      </div>

      {/* Athlete Details */}
      {athleteData ? (
        <>
          {/* General Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{athleteData.name}</h3>
                <p className="text-gray-600 mt-1">{athleteData.club}</p>
              </div>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Total Results</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{athleteData.totalResults}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Competitions</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{athleteData.competitions}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">Bow Types</div>
                <div className="flex flex-wrap gap-1">
                  {athleteData.bowTypes.map((bow, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded text-xs font-medium border ${getBowTypeColor(bow)}`}>
                      {bow}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">Age Classes</div>
                <div className="flex flex-wrap gap-1">
                  {athleteData.ageClasses.map((age, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded text-xs font-medium border ${getAgeClassColor(age)}`}>
                      {age}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Distance Statistics */}
          <div className="space-y-4">
            {athleteData.distanceStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Distance Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{stat.distance}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Best: </span>
                        <span className="font-bold text-gray-900">{stat.best}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Top 3: </span>
                        <span className="font-bold text-gray-900">{stat.avgTop3}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Results: </span>
                        <span className="font-bold text-gray-900">{stat.count}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart or Table */}
                <div className="p-6">
                  {stat.showChart ? (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Progress Over Time</h4>
                      </div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={stat.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="timestamp"
                              scale="time"
                              type="number"
                              domain={['dataMin', 'dataMax']}
                              tickFormatter={(timestamp) => {
                                const date = new Date(timestamp);
                                const month = date.getMonth() + 1;
                                const year = date.getFullYear().toString().slice(2);
                                return `${month}/${year}`;
                              }}
                              ticks={(() => {
                                // Generate ticks every 3 months
                                if (stat.chartData.length === 0) return [];
                                
                                const startDate = new Date(stat.chartData[0].timestamp);
                                const endDate = new Date(stat.chartData[stat.chartData.length - 1].timestamp);
                                const ticks = [];
                                
                                // Start from the beginning of the quarter
                                const currentDate = new Date(startDate.getFullYear(), Math.floor(startDate.getMonth() / 3) * 3, 1);
                                
                                while (currentDate <= endDate) {
                                  ticks.push(currentDate.getTime());
                                  // Add 3 months
                                  currentDate.setMonth(currentDate.getMonth() + 3);
                                }
                                
                                return ticks;
                              })()}
                            />
                            <YAxis domain={['dataMin - 20', 'dataMax + 20']} />
                            <Tooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                                      <p className="font-semibold text-gray-900">{data.date}</p>
                                      <p className="text-sm text-gray-600">{data.competition}</p>
                                      <p className="text-lg font-bold text-blue-600 mt-1">Score: {data.result}</p>
                                      {data.trend && (
                                        <p className="text-sm text-green-600 mt-1">Trend: {data.trend.toFixed(1)}</p>
                                      )}
                                      <div className="flex gap-2 mt-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getBowTypeColor(data.bowType)}`}>
                                          {data.bowType}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getAgeClassColor(data.ageClass)}`}>
                                          {data.ageClass}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            {/* Trend line */}
                            <Line 
                              type="monotone" 
                              dataKey="trend"
                              stroke="#10b981"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={false}
                              name="Trend"
                              connectNulls
                            />
                            {/* Actual results */}
                            <Line 
                              type="monotone" 
                              dataKey="result" 
                              stroke="#2563eb" 
                              strokeWidth={2}
                              dot={{ fill: '#2563eb', r: 4 }}
                              activeDot={{ r: 6 }}
                              name="Result"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-0.5 bg-blue-600"></div>
                          <span className="text-gray-600">Actual Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-0.5 bg-green-500 border-dashed" style={{borderTop: '2px dashed #10b981', borderBottom: 'none', height: '0'}}></div>
                          <span className="text-gray-600">Trend (Logarithmic)</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Results Table */}
                  <div className={stat.showChart ? 'mt-6' : ''}>
                    <h4 className="font-semibold text-gray-900 mb-3">All Results</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Competition</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Bow</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Age</th>
                            <th className="px-4 py-2 text-right font-semibold text-gray-700">Result</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {stat.records.map((record, i) => (
                            <tr key={i} className={i === 0 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                              <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{record.Date}</td>
                              <td className="px-4 py-2 text-gray-700">{record.Competition}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getBowTypeColor(record['Bow Type'])}`}>
                                  {record['Bow Type']}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getAgeClassColor(record['Age Class'] || 'Adult')}`}>
                                  {record['Age Class'] || 'Adult'}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-right font-bold text-gray-900">
                                {record.Result}
                                {i === 0 && <span className="ml-2 text-yellow-600">🏆</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Athlete</h3>
          <p className="text-gray-600">
            Use the search bar above to find an athlete and view their statistics
          </p>
        </div>
      )}
    </div>
  );
}

function ReportPage({ databaseRecords, onAthleteClick }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportsRef = useRef(null);

  // Distance ordering logic
  const getDistanceValue = (distance) => {
    const match = distance.match(/(\d+)m/);
    return match ? parseInt(match[1]) : 0;
  };

  const isMainDistance = (distance) => {
    return distance.includes('2x70') || distance.includes('2x18');
  };

  const sortDistances = (distances) => {
    return [...distances].sort((a, b) => {
      // Main distances first
      const aIsMain = isMainDistance(a);
      const bIsMain = isMainDistance(b);
      if (aIsMain && !bIsMain) return -1;
      if (!aIsMain && bIsMain) return 1;
      
      // Then by length (longest to shortest)
      return getDistanceValue(b) - getDistanceValue(a);
    });
  };

  // Get seasonal best for each athlete
  const getSeasonalBest = (records, bowType, gender, ageClass, distance) => {
    const filtered = records.filter(r => {
      const matchesBow = r['Bow Type'] === bowType;
      const matchesGender = r.Gender === gender;
      const matchesAge = (r['Age Class'] || '') === ageClass;
      const matchesDistance = r['Shooting Exercise'] === distance;
      // Use hierarchical age classes for matching
      const ageClasses = r['Age Classes'] || [r['Age Class'] || ''];
      const matchesAgeHierarchical = ageClasses.includes(ageClass);
      
      return matchesBow && matchesGender && matchesAgeHierarchical && matchesDistance;
    });

    // Group by athlete and take best result
    const athleteBest = {};
    filtered.forEach(record => {
      const athlete = record.Athlete;
      if (!athleteBest[athlete] || record.Result > athleteBest[athlete].Result) {
        athleteBest[athlete] = record;
      }
    });

    // Convert to array and sort by result (highest first)
    return Object.values(athleteBest)
      .sort((a, b) => (b.Result || 0) - (a.Result || 0));
  };

  // Organize all categories
  const organizeReports = () => {
    const bowTypes = ['Recurve', 'Compound', 'Barebow', 'Longbow'];
    const genders = ['Men', 'Women'];
    const ageGroups = ['', 'U21', 'U18', 'U15', 'U13', '+50', '+60', '+70'];
    
    const reports = [];

    bowTypes.forEach(bowType => {
      genders.forEach(gender => {
        ageGroups.forEach(ageClass => {
          // Get all distances for this category
          const relevantRecords = databaseRecords.filter(r => {
            const matchesBow = r['Bow Type'] === bowType;
            const matchesGender = r.Gender === gender;
            const ageClasses = r['Age Classes'] || [r['Age Class'] || ''];
            const matchesAge = ageClasses.includes(ageClass);
            return matchesBow && matchesGender && matchesAge;
          });

          const distances = [...new Set(relevantRecords.map(r => r['Shooting Exercise']))];
          const sortedDistances = sortDistances(distances);

          sortedDistances.forEach(distance => {
            const rankings = getSeasonalBest(databaseRecords, bowType, gender, ageClass, distance);
            
            if (rankings.length > 0) {
              reports.push({
                bowType,
                gender,
                ageClass: ageClass || 'Adult',
                distance,
                rankings
              });
            }
          });
        });
      });
    });

    return reports;
  };

  const reports = organizeReports();

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    
    try {
      // Try to load libraries dynamically
      console.log('Loading PDF libraries...');
      
      // Load jsPDF
      if (!window.jsPDF) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          script.onload = () => {
            console.log('jsPDF loaded');
            resolve();
          };
          script.onerror = (e) => {
            console.error('Failed to load jsPDF', e);
            reject(new Error('Failed to load jsPDF'));
          };
          document.head.appendChild(script);
        });
      }
      
      // Load html2canvas
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          script.onload = () => {
            console.log('html2canvas loaded');
            resolve();
          };
          script.onerror = (e) => {
            console.error('Failed to load html2canvas', e);
            reject(new Error('Failed to load html2canvas'));
          };
          document.head.appendChild(script);
        });
      }

      console.log('Libraries loaded, generating PDF...');
      
      const jsPDF = window.jsPDF?.jsPDF;
      const html2canvas = window.html2canvas;
      
      if (!jsPDF || !html2canvas) {
        throw new Error('PDF libraries not available');
      }

      // Get the reports container
      const element = reportsRef.current;
      if (!element) {
        throw new Error('No reports to export');
      }

      // Temporarily hide elements that shouldn't be in PDF
      const printHiddenElements = document.querySelectorAll('.print\\:hidden');
      printHiddenElements.forEach(el => {
        el.style.display = 'none';
      });

      console.log('Capturing content...');
      
      // Configure html2canvas for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      console.log('Canvas created, generating PDF...');

      // Restore hidden elements
      printHiddenElements.forEach(el => {
        el.style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      const filename = `Estonian_Archery_Rankings_${date}.pdf`;

      console.log('Saving PDF...');
      
      // Download
      pdf.save(filename);
      
      console.log('PDF saved successfully');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Show user-friendly error with option to print instead
      const usePrint = confirm(
        'PDF generation failed. Would you like to use Print/Save as PDF instead?\n\n' +
        'Click OK to open print dialog, or Cancel to try again later.'
      );
      
      if (usePrint) {
        window.print();
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const getCategoryTitle = (report) => {
    return `${report.bowType} ${report.ageClass} ${report.gender} - ${report.distance}`;
  };

  const getBowTypeColor = (bowType) => {
    const colors = {
      'Recurve': 'bg-blue-100 text-blue-800 border-blue-200',
      'Compound': 'bg-purple-100 text-purple-800 border-purple-200',
      'Barebow': 'bg-amber-100 text-amber-800 border-amber-200',
      'Longbow': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[bowType] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAgeClassColor = (ageClass) => {
    const colors = {
      'U13': 'bg-pink-100 text-pink-800 border-pink-200',
      'U15': 'bg-rose-100 text-rose-800 border-rose-200',
      'U18': 'bg-orange-100 text-orange-800 border-orange-200',
      'U21': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Adult': 'bg-slate-100 text-slate-800 border-slate-200',
      '+50': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      '+60': 'bg-teal-100 text-teal-800 border-teal-200',
      '+70': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colors[ageClass] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header - Hide on print */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 print:hidden">
        <div>
          <h2 className="text-2xl font-bold">Seasonal Best Rankings</h2>
          <p className="text-gray-600 text-sm mt-1">Top results by category - One per athlete per distance</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf || reports.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-colors"
          >
            {isGeneratingPdf ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
          <button 
            onClick={() => window.print()}
            disabled={reports.length === 0}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 flex items-center gap-2 shadow-sm transition-colors"
          >
            <FileText className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Info banner - Hide on print */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Export Options</h3>
            <p className="text-sm text-blue-800">
              <strong>Download PDF:</strong> Automatically generates a PDF file. <strong>Print:</strong> Use your browser's print dialog (File → Print → Save as PDF).
            </p>
          </div>
        </div>
      </div>

      {/* Organization info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:hidden">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Report Organization</h3>
            <p className="text-sm text-gray-700">
              Rankings are organized by: <strong>Bow Type</strong> (Recurve → Compound → Barebow → Longbow) → 
              <strong> Gender</strong> (Men → Women) → <strong> Age Class</strong> (Adult → Youth → Seniors) → 
              <strong> Distance</strong> (Main distance first, then longest to shortest)
            </p>
          </div>
        </div>
      </div>

      {/* Statistics - Hide on print */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 print:hidden">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 uppercase tracking-wide">Total Categories</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{reports.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 uppercase tracking-wide">Unique Athletes</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {new Set(databaseRecords.map(r => r.Athlete)).size}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 uppercase tracking-wide">Total Results</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {reports.reduce((sum, r) => sum + r.rankings.length, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 uppercase tracking-wide">Bow Types</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {new Set(reports.map(r => r.bowType)).size}
          </div>
        </div>
      </div>

      {/* Reports - Optimized for printing */}
      <div ref={reportsRef} className="space-y-8 print:space-y-6">
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <div key={index} className="bg-white rounded-lg shadow print:shadow-none print:border print:border-gray-300 overflow-hidden break-inside-avoid">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-4 py-3 print:bg-gray-50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getBowTypeColor(report.bowType)}`}>
                    {report.bowType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getAgeClassColor(report.ageClass)}`}>
                    {report.ageClass}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    report.gender === 'Men' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                  }`}>
                    {report.gender}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-200 text-gray-800">
                    {report.distance}
                  </span>
                </div>
              </div>

              {/* Rankings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b-2 border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 w-16">Rank</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Athlete</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Club</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Competition</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-right font-bold text-gray-700 w-24">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.rankings.map((record, rank) => (
                      <tr key={rank} className={`${rank < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-3 font-bold text-gray-900">
                          {rank === 0 && <span className="text-yellow-600">🥇</span>}
                          {rank === 1 && <span className="text-gray-400">🥈</span>}
                          {rank === 2 && <span className="text-amber-600">🥉</span>}
                          {rank > 2 && <span className="text-gray-600">{rank + 1}</span>}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          <button
                            onClick={() => onAthleteClick && onAthleteClick(record.Athlete)}
                            className="hover:text-blue-600 hover:underline cursor-pointer"
                          >
                            {record.Athlete}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{record.Club}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{record.Competition}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{record.Date}</td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-gray-900">{record.Result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Category footer with count */}
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-600">
                {report.rankings.length} {report.rankings.length === 1 ? 'athlete' : 'athletes'}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600">
              Add records to the database to generate reports
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Print styles for PDF export
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      @page {
        margin: 1cm;
        size: A4;
      }
      
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      
      .print\\:hidden {
        display: none !important;
      }
      
      .print\\:shadow-none {
        box-shadow: none !important;
      }
      
      .print\\:border {
        border: 1px solid #d1d5db !important;
      }
      
      .print\\:border-gray-300 {
        border-color: #d1d5db !important;
      }
      
      .print\\:bg-gray-50 {
        background-color: #f9fafb !important;
      }
      
      .print\\:space-y-6 > * + * {
        margin-top: 1.5rem !important;
      }
      
      .break-inside-avoid {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
      /* Ensure tables don't break across pages awkwardly */
      table {
        break-inside: avoid;
      }
      
      /* Keep category headers with their content */
      .bg-gradient-to-r {
        break-after: avoid;
        page-break-after: avoid;
      }
    }
  `;
  document.head.appendChild(style);
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1); // Start at Import
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [importedData, setImportedData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [databaseRecords, setDatabaseRecords] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  
  const stats = {
    imported: importedData ? importedData.data.length : 0,
    parsed: parsedData ? parsedData.parsed.length : 0,
    finalized: databaseRecords.length,
  };

  const handleApprove = (record) => {
    // Add approved record directly to database
    setDatabaseRecords(prev => [...prev, record]);
    
    // Remove from needsReview
    setParsedData(prev => ({
      ...prev,
      needsReview: prev.needsReview.filter(r => r._id !== record._id)
    }));
  };

  const handleAthleteClick = (athleteName) => {
    setSelectedAthlete(athleteName);
    setCurrentStep(6);
  };

  const renderPage = () => {
    switch (currentStep) {
      case 1: return <ImportPage onImport={setImportedData} importedData={importedData} setCurrentStep={setCurrentStep} />;
      case 2: return <ParsePage importedData={importedData} onParse={setParsedData} parsedData={parsedData} settings={settings} onSettingsChange={setSettings} setCurrentStep={setCurrentStep} addToDatabase={(records) => setDatabaseRecords(prev => [...prev, ...records])} />;
      case 3: return <ReviewPage parsedData={parsedData} onApprove={handleApprove} onFinalize={() => setCurrentStep(4)} settings={settings} />;
      case 4: return <DatabasePage databaseRecords={databaseRecords} onAthleteClick={handleAthleteClick} />;
      case 5: return <ReportPage databaseRecords={databaseRecords} onAthleteClick={handleAthleteClick} />;
      case 6: return <AthletePage databaseRecords={databaseRecords} selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete} />;
      default: return <ImportPage onImport={setImportedData} importedData={importedData} setCurrentStep={setCurrentStep} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Header sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      
      {/* Mobile Navigation Tabs - Horizontal at top */}
      <div className="md:hidden bg-white border-b overflow-x-auto">
        <MobileNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Only show on medium screens and up */}
        <div className="hidden md:block">
          <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} sidebarCollapsed={sidebarCollapsed} stats={stats} />
        </div>
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
