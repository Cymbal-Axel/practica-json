function getAlumnos() {
    var alumno = {
        name: "Federico",
        lastName: "Gonzalez",
        birthDate: "15/05/1995",
        materias: {
            biologia: [5, 2, 7],
            matematica: [8, 9, 7],
            lengua: [5, 5, 5],
            historia: [7, 6, 5],
        }

    };

    var alumnoDos = {
        name: "Victoria",
        lastName: "Diaz",
        birthDate: "12/07/2001",
        materias: {
            biologia: [5, 2, 5],
            matematica: [8, 2, 7],
            lengua: [5, 5, 8],
            historia: [2, 6, 5],
        }
    };
    var alumnoTres = {
        name: "Vanina",
        lastName: "Rodino",
        birthDate: "30/01/1980",
        materias: {
            biologia: [10, 2, 7],
            matematica: [8, 9, 10],
            lengua: [5, 10, 5],
            historia: [9, 6, 5],
        }
    }
    return [alumno, alumnoDos, alumnoTres]
}

function getPromedioByMateria(materia) {
    var notas = 0;
    materia.forEach((nota) => {
        notas += nota
    })
    return notas / materia.length
}



function proccessData(curso) {
    var alumnosDatos = [];
    curso.forEach((alumno) => {
        const promedioBiologia = getPromedioByMateria(alumno.materias.biologia);
        const promedioHistoria = getPromedioByMateria(alumno.materias.historia);
        const promedioMate = getPromedioByMateria(alumno.materias.matematica);
        const promedioLengua = getPromedioByMateria(alumno.materias.lengua);
        const estadoMateriaMatematica = calcularAlumnoSeLlevaLaMateria(alumno.materias.matematica, promedioMate);
        const estadoMateriaHistoria = calcularAlumnoSeLlevaLaMateria(alumno.materias.historia, promedioHistoria);
        const estadoMateriaBiologia = calcularAlumnoSeLlevaLaMateria(alumno.materias.biologia, promedioBiologia);
        const estadoMateriaLengua = calcularAlumnoSeLlevaLaMateria(alumno.materias.lengua, promedioLengua);
        alumnosDatos.push({
            ...alumno,
            infoMaterias: {
                biologia: { promedio: promedioBiologia, estado: estadoMateriaBiologia },
                historia: { promedio: promedioHistoria, estado: estadoMateriaHistoria },
                matematica: { promedio: promedioMate, estado: estadoMateriaMatematica },
                lengua: { promedio: promedioLengua, estado: estadoMateriaLengua },
            },
            promedioGeneral: (promedioMate + promedioLengua + promedioBiologia + promedioHistoria) / 4
        });
    })
    return alumnosDatos;
}

function printData(datosProcesados) {
    console.log(datosProcesados)
}

function sortAlumnos(alumnos) {
    return alumnos.sort(function(a, b){return b.promedioGeneral - a.promedioGeneral});
}

function calcularAlumnoSeLlevaLaMateria(materia, promedio) {



    if (promedio >= 6 && materia[2] >= 6) {
        return 'Aprobado';
    } else if (promedio < 4) {
        return 'A Marzo';
    } else if (promedio < 6) {
        return 'Se lleva trimestres con menos de 6 a Diciembre';
    } else if (promedio >= 6 && materia[2] < 6) {
        return 'Se lleva trimestres con menos de 6';
    }
}

const curso = getAlumnos();
const datosProcesados = sortAlumnos(proccessData(curso));
printData(datosProcesados)
