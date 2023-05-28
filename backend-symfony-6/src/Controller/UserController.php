<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    #[Route('/user', name: 'user_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $users = $doctrine
            ->getRepository(User::class)
            ->findAll();
  
        $data = [];
  
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                // 'password' => $user->getPassword(),
            ];
        }
  
        return $this->json($data);
    }
    
    #[Route('/user', name: 'user_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $jsonData = json_decode($request->getContent(), true);

        $username = $jsonData['username'];
        $password = $jsonData['password'];

        $user = new User();
        $user->setUsername($username);
        $user->setPassword($password);

        $user2 = $entityManager->getRepository(User::class)->findOneByUsername($username);
        if (!$user2) {
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->json('Created new user successfully with id ' . $user->getId());
        }
        else {
            return $this->json('user already exist '); 
        }
  
    }
    #[Route('/user/{id}', name: 'user_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $user = $doctrine->getRepository(User::class)->find($id);
  
        if (!$user) {
            return $this->json('No user found for id ' . $id, 404);
        }
  
        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
        ];
          
        return $this->json($data);
    }

    #[Route('/user/username/{username}', name: 'user_showByUsername', methods: ['GET'])]
    public function showByUsername(ManagerRegistry $doctrine, string $username): Response
    {
        $user = $doctrine->getRepository(User::class)->findOneByUsername($username);
  
        if (!$user) {
            return $this->json('No user found for username ' . $username, 404);
        }
  
        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
        ];
          
        return $this->json($data);
    }
  
    #[Route('/user/{id}', name: 'user_edit', methods: ['PUT'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->find($id);
  
        if (!$user) {
            return $this->json('No user found for id ' . $id, 404);
        }
  
        $user->setUsername($request->request->get('username'));
        $user->setPassword($request->request->get('password'));
        $entityManager->flush();
  
        $data = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
        ];
          
        return $this->json($data);
    }
  
    #[Route('/user/{id}', name: 'user_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->find($id);
  
        if (!$user) {
            return $this->json('No user found for id ' . $id, 404);
        }
  
        $entityManager->remove($user);
        $entityManager->flush();
  
        return $this->json('Deleted a user successfully with id ' . $id);
    }
}
