from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Dossier

# Create your views here.
@csrf_exempt
def deposer_dossier(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "Méthode non autorisée"}, status=405)

    try:
        # Champs texte
        fields = {
            "nom": request.POST.get("nom", ""),
            "prenom": request.POST.get("prenom", ""),
            "email": request.POST.get("email", ""),
            "departement": request.POST.get("departement", ""),
            "grade": request.POST.get("grade", ""),
            "nomProjet": request.POST.get("nomProjet", ""),
            "typeAccord": request.POST.get("typeAccord", ""),
            "choix": request.POST.get("choix", "false") == "true",
            "etablissementPartenaire": request.POST.get("etablissementPartenaire", ""),
            "pays": request.POST.get("pays", ""),
            "ville": request.POST.get("ville", ""),
            "durée": request.POST.get("durée", ""),
            "objectif": request.POST.get("objectif", ""),
            "commentaires": request.POST.get("commentaires", ""),
        }

        # Fichier PDF
        dossier_pdf = request.FILES.get("dossier_pdf", None)

        dossier = Dossier.objects.create(
            **fields,
            dossier_pdf=dossier_pdf
        )

        return JsonResponse({"success": True, "id": dossier.id})

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=400)

    

@require_http_methods(["GET"])
def lister_dossiers(request):
        try:
            dossiers = Dossier.objects.all().values()
            return JsonResponse({
                'success': True,
                'dossiers': list(dossiers)
            }, status=200)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def liste(request):
    user_email = request.user.email
    dossiers_user = Dossier.objects.filter(email=user_email)
    data = [{
        "id": d.id,
        "nomProjet": d.nomProjet,
        "typeAccord": d.typeAccord,
        "durée": d.durée,
        "etat": d.etat,
        "commentaires": d.commentaires
    } for d in dossiers_user]
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dossier_details(request, dossier_id):
    try:
        dossier = Dossier.objects.get(id=dossier_id, email=request.user.email)
        data = {
            "id": dossier.id,
            "nom": dossier.nom,
            "prenom": dossier.prenom,
            "email": dossier.email,
            "departement": dossier.departement,
            "grade": dossier.grade,
            "nomProjet": dossier.nomProjet,
            "typeAccord": dossier.typeAccord,
            "choix": dossier.choix,
            "etablissementPartenaire": dossier.etablissementPartenaire,
            "pays": dossier.pays,
            "ville": dossier.ville,
            "durée": dossier.durée,
            "objectif": dossier.objectif,
            "commentaires": dossier.commentaires,
            "etat": dossier.etat
        }
        return Response(data)
    except Dossier.DoesNotExist:
        return Response({"error": "Dossier non trouvé."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def modifier_dossier(request, dossier_id):
    try:
        dossier = Dossier.objects.get(id=dossier_id, email=request.user.email)
        data = request.data 
        # Méthode PUT pour modifier
        for field in data:
            if field != "id" and field in request.data:
                setattr(dossier, field, request.data[field])
        dossier.save()

        return Response({"message": "Dossier mis à jour avec succès."})

    except Dossier.DoesNotExist:
        return Response({"error": "Dossier non trouvé."}, status=404)



####Statistiques des dossiers par état (optionnel)
@require_http_methods(["GET"])
def statistiques_dossiers_fermes(request):
    try:
        count = Dossier.objects.filter(etat='ferme').count()
        return JsonResponse({
            'success': True,
            'dossiers_fermes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
#stat par user
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Dossier

from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def statistiques_dossiers_fermes_user(request):
    try:
        user_email = request.user.email
        count = Dossier.objects.filter(etat='ferme', email=user_email).count()

        return Response({
            'success': True,
            'dossiers_fermes': count
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def statistiques_dossiers_refuse_user(request):
    try:
        user_email = request.user.email
        count = Dossier.objects.filter(etat='refuse', email=user_email).count()

        return Response({
            'success': True,
            'dossiers_refuse': count
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=400)
#stats générales
@require_http_methods(["GET"])
def statistiques_dossiers_acceptes(request):
    try:
        count = Dossier.objects.filter(etat='accepté').count()
        return JsonResponse({
            'success': True,
            'dossiers_acceptes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_rejetes(request):
    try:
        count = Dossier.objects.filter(etat='rejeté').count()
        return JsonResponse({
            'success': True,
            'dossiers_rejetes': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteDRI(request):
    try:
        count = Dossier.objects.filter(etat='en attente de DRI').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_de_DRI': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteDEVE(request):
    try:
        count = Dossier.objects.filter(etat='en attente de DEVE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_de_DEVE': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)

@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCA(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CA': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCEVE(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CEVE').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CEVE': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)
    
@require_http_methods(["GET"])
def statistiques_dossiers_en_attenteCEVU(request):
    try:
        count = Dossier.objects.filter(etat='en attente de CEVU').count() 
        return JsonResponse({
            'success': True,
            'dossiers_en_attente_CEVU': count
        }, status=200)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)